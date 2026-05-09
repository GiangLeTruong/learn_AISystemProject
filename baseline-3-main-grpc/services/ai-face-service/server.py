import sys
import os
import grpc
from concurrent import futures
import torch
import cv2
import json
import numpy as np
from PIL import Image
from torchvision import transforms
import torch.nn.functional as F
from facenet_pytorch import MTCNN

# BƯỚC VÁ LỖI ĐƯỜNG DẪN CHO PROTO
CURRENT_DIR = os.path.dirname(os.path.abspath(__file__))
sys.path.append(os.path.join(CURRENT_DIR, 'generated_protos'))

import face_service_pb2
import face_service_pb2_grpc

from model import FaceRecognitionModel

# --- CẤU HÌNH ---
MODEL_PATH = './face_classifier.pth'
CLASS_NAMES_PATH = './class_names.json'
CONFIDENCE_THRESHOLD = 0.6  
DEVICE = torch.device("cuda:0" if torch.cuda.is_available() else "cpu")

# Biến toàn cục lưu model
system_model = None
system_mtcnn = None
system_class_names = None
system_transform = None

def load_system():
    """Hàm này chạy 1 lần khi khởi động Server gRPC"""
    global system_model, system_mtcnn, system_class_names, system_transform
    
    try:
        with open(CLASS_NAMES_PATH, 'r') as f:
            system_class_names = json.load(f)
            print(f"--> Đã load danh sách lớp: {system_class_names}")
    except Exception as e:
        print("Lỗi: Không tìm thấy file class_names.json.")
        raise e

    print("--> Đang load MobileNetV2 Model...")
    system_model = FaceRecognitionModel(num_classes=len(system_class_names))
    system_model.load_state_dict(torch.load(MODEL_PATH, map_location=DEVICE))
    system_model.to(DEVICE)
    system_model.eval() 

    print("--> Đang load MTCNN...")
    system_mtcnn = MTCNN(keep_all=False, select_largest=True, device=DEVICE, post_process=False, min_face_size=150)

    system_transform = transforms.Compose([
        transforms.Resize((224, 224)),
        transforms.ToTensor(),
        transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
    ])
    print("--> Hệ thống AI Face ID (gRPC) sẵn sàng!")

# --- ĐỊNH NGHĨA CLASS SERVICE gRPC ---
class AiFaceServiceServicer(face_service_pb2_grpc.AiFaceServiceServicer):
    
    def VerifyFace(self, request, context):
        """Hàm nhận diện được Node.js gọi qua gRPC"""
        
        # Kiểm tra xem hệ thống đã khởi động chưa
        if system_model is None or system_mtcnn is None:
            return face_service_pb2.FaceVerifyResponse(
                success=False,
                message="Hệ thống AI chưa được khởi tạo đúng cách.",
                data=face_service_pb2.FaceVerifyResponse.FaceData(status="ERROR", user_id="", confidence=0.0)
            )

        try:
            # 1. NHẬN DỮ LIỆU TỪ gRPC (Siêu tốc độ)
            # request.image_data chính là luồng byte truyền thẳng từ RAM của Node.js
            contents = request.image_data
            
            # Biến byte thành mảng Numpy để OpenCV đọc
            nparr = np.frombuffer(contents, np.uint8)
            frame = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

            if frame is None:
                return face_service_pb2.FaceVerifyResponse(
                    success=False,
                    message="File ảnh không hợp lệ hoặc bị hỏng trong quá trình truyền.",
                    data=face_service_pb2.FaceVerifyResponse.FaceData(status="ERROR", user_id="", confidence=0.0)
                )

            # 2. XỬ LÝ ẢNH BẰNG LÕI CŨ (Giữ nguyên 100% logic của Giang)
            frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
            boxes, _ = system_mtcnn.detect(frame_rgb)

            if boxes is None:
                return face_service_pb2.FaceVerifyResponse(
                    success=False,
                    message="Không tìm thấy khuôn mặt nào trong ảnh",
                    data=face_service_pb2.FaceVerifyResponse.FaceData(status="UNRECOGNIZED", user_id="", confidence=0.0)
                )

            box = boxes[0]
            x1, y1, x2, y2 = [int(b) for b in box]
            h, w, _ = frame.shape
            x1, y1 = max(0, x1), max(0, y1)
            x2, y2 = min(w, x2), min(h, y2)

            face_img = frame_rgb[y1:y2, x1:x2]
            
            if face_img.size == 0:
                return face_service_pb2.FaceVerifyResponse(
                    success=False,
                    message="Lỗi trích xuất khuôn mặt",
                    data=face_service_pb2.FaceVerifyResponse.FaceData(status="ERROR", user_id="", confidence=0.0)
                )

            # 3. ĐƯA VÀO MODEL DỰ ĐOÁN
            pil_img = Image.fromarray(face_img)
            input_tensor = system_transform(pil_img).unsqueeze(0)
            input_tensor = input_tensor.to(DEVICE)

            with torch.no_grad():
                outputs = system_model(input_tensor)
                probs = F.softmax(outputs, dim=1)
                max_prob, preds = torch.max(probs, 1)

            confidence = max_prob.item()
            class_idx = preds.item()
            
            # 4. TRẢ VỀ KẾT QUẢ THEO ĐỊNH DẠNG PROTOBUF
            if confidence > CONFIDENCE_THRESHOLD:
                name = system_class_names[class_idx]
                print("Đã xử lý nhận diện khuôn mặt thành công.")
                return face_service_pb2.FaceVerifyResponse(
                    success=True,
                    message="Nhận diện thành công",
                    data=face_service_pb2.FaceVerifyResponse.FaceData(
                        status="MATCHED",
                        user_id=name,
                        confidence=round(confidence * 100, 2)
                    )
                )
            else:
                print("Lỗi khi xử lý nhận diện khuôn mặt thành công.")
                return face_service_pb2.FaceVerifyResponse(
                    success=True, # Lệnh chạy thành công, chỉ là không khớp mặt thôi
                    message="Không nhận diện được người dùng",
                    data=face_service_pb2.FaceVerifyResponse.FaceData(
                        status="UNRECOGNIZED",
                        user_id="UNKNOWN",
                        confidence=round(confidence * 100, 2)
                    )
                )

        except Exception as e:
            print(f"Lỗi hệ thống: {str(e)}")
            return face_service_pb2.FaceVerifyResponse(
                success=False,
                message=f"Lỗi Server AI: {str(e)}",
                data=face_service_pb2.FaceVerifyResponse.FaceData(status="ERROR", user_id="", confidence=0.0)
            )

# --- KHỞI ĐỘNG SERVER ---
def serve():
    port = '7104'
    # 1. Gọi hàm load_system trước khi mở cửa đón khách
    load_system()
    
    # 2. Tạo server gRPC
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    
    # 3. Đăng ký Class xử lý vào Server
    face_service_pb2_grpc.add_AiFaceServiceServicer_to_server(AiFaceServiceServicer(), server)
    
    # 4. Mở cổng
    server.add_insecure_port(f'[::]:{port}')
    server.start()
    print(f"🚀 AI Face Service (gRPC) đang lắng nghe tại cổng {port}...")
    
    # Giữ cho server không bị tắt
    server.wait_for_termination()

if __name__ == '__main__':
    serve()