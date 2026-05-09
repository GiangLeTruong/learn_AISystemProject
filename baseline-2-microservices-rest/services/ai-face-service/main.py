import torch
import cv2
import json
import numpy as np
from PIL import Image
from torchvision import transforms
import torch.nn.functional as F
from facenet_pytorch import MTCNN
from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.responses import JSONResponse
import io

from model import FaceRecognitionModel

# --- CẤU HÌNH ---
MODEL_PATH = './face_classifier.pth'
CLASS_NAMES_PATH = './class_names.json'
CONFIDENCE_THRESHOLD = 0.6  
DEVICE = torch.device("cuda:0" if torch.cuda.is_available() else "cpu")

# Khởi tạo FastAPI app
app = FastAPI(title="AI Face ID Service", description="API phục vụ nhận diện khuôn mặt cho ERP")

# Biến toàn cục lưu model
system_model = None
system_mtcnn = None
system_class_names = None
system_transform = None

@app.on_event("startup")
async def load_system():
    """Hàm này chạy 1 lần khi khởi động Server FastAPI"""
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
    print("--> Hệ thống AI Face ID sẵn sàng!")

@app.post("/api/v1/face/verify")
async def verify_face(file: UploadFile = File(...)):
    """API nhận file ảnh và trả về kết quả nhận diện"""
    if system_model is None or system_mtcnn is None:
        raise HTTPException(status_code=500, detail="Hệ thống AI chưa được khởi tạo đúng cách.")

    try:
        # 1. Đọc dữ liệu ảnh từ request body
        contents = await file.read()
        nparr = np.frombuffer(contents, np.uint8)
        frame = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

        if frame is None:
            raise HTTPException(status_code=400, detail="File ảnh không hợp lệ.")

        # 2. Xử lý ảnh giống hệt code cục bộ
        frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        
        # Detect khuôn mặt (MTCNN select_largest=True nên chỉ trả về 1 khuôn mặt to nhất)
        boxes, _ = system_mtcnn.detect(frame_rgb)

        if boxes is None:
            return JSONResponse(content={
                "success": False,
                "message": "Không tìm thấy khuôn mặt nào trong ảnh",
                "data": None
            })

        # Lấy tọa độ khuôn mặt đầu tiên
        box = boxes[0]
        x1, y1, x2, y2 = [int(b) for b in box]
        h, w, _ = frame.shape
        x1, y1 = max(0, x1), max(0, y1)
        x2, y2 = min(w, x2), min(h, y2)

        face_img = frame_rgb[y1:y2, x1:x2]
        
        if face_img.size == 0:
            return JSONResponse(content={"success": False, "message": "Lỗi trích xuất khuôn mặt"})

        # 3. Đưa vào Model dự đoán
        pil_img = Image.fromarray(face_img)
        input_tensor = system_transform(pil_img).unsqueeze(0)
        input_tensor = input_tensor.to(DEVICE)

        with torch.no_grad():
            outputs = system_model(input_tensor)
            probs = F.softmax(outputs, dim=1)
            max_prob, preds = torch.max(probs, 1)

        confidence = max_prob.item()
        class_idx = preds.item()
        
        # 4. Trả về kết quả
        if confidence > CONFIDENCE_THRESHOLD:
            name = system_class_names[class_idx]
            return JSONResponse(content={
                "success": True,
                "message": "Nhận diện thành công",
                "data": {
                    "userId": name, # Tên thư mục lúc bạn train nên để là ID của user
                    "confidence": round(confidence * 100, 2),
                    "status": "MATCHED"
                }
            })
        else:
            return JSONResponse(content={
                "success": True,
                "message": "Không nhận diện được người dùng",
                "data": {
                    "userId": "UNKNOWN",
                    "confidence": round(confidence * 100, 2),
                    "status": "UNRECOGNIZED"
                }
            })

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))