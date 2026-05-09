**FaceRec-DeepLearning System**
Dự án phát triển hệ thống nhận diện khuôn mặt sử dụng Deep Learning (CNNs, ArcFace/FaceNet). 
Tài liệu này quy định các chuẩn mực coding (Coding Conventions) bắt buộc cho toàn bộ thành viên dự án.

# 1. Cấu trúc Dự án
**- Phân chia host**
Baseline 1: Monolith + REST API             *port: 5100 localhost:5100
Baseline 2: Microservices + REST API        *port: 6100 - localhost:6100/api
Baseline 3 (Main): Microservices + gRPC     *port: 7100 - localhost:7100/api

**- Phân chia tài nguyên**
Baseline 1 (Monolithic): 1 Container chứa toàn bộ: cpus: '4.0', memory: 8G
Baseline 2 & 3 (Microservices):
    api-gateway (Node.js - Rất nhẹ): cpus: '0.3', memory: 512M

    user-service (Node.js - Vừa): cpus: '0.5', memory: 1G

    shopping-service (Node.js - Vừa): cpus: '0.5', memory: 1G

    ai-face-service (Python PyTorch - Nặng CPU/RAM): cpus: '1.7', memory: 3.5G

    ai-recommend-service (Python - Nặng RAM khi lưu Matrix): cpus: '1.0', memory: 2G

    => Tổng cộng: Đúng 4.0 CPU và 8GB RAM.

# 2. Quy ước Đặt tên
**- Biến và Hàm (camelCase)**
Đặt tên theo phong cách camelCase. _VD: userName, firstName, getNewItems_
Biến: Phải mang ý nghĩa rõ ràng. Tránh đặt tên biến đơn (a, b, x) trừ khi là công thức toán học phổ quát hoặc biến chạy trong loop.
Hàm: Bắt đầu bằng động từ.

**- Quy ước đặc thù Deep Learning**
X: Dữ liệu đầu vào (Features/Images).
y: Nhãn (Labels/Targets).
y_pred: Kết quả dự đoán từ model.
Tên tensor nên gợi ý về kích thước (shape) nếu cần thiết:
(Batch_size, Channels, Height, Width)
images_bchw = ... 
embeddings_batch = ...

# 3. Quy tắc Code & Clean Code
Imports: Chia làm 3 nhóm: Thư viện chuẩn (os, sys) -> Thư viện bên thứ 3 (numpy, torch, cv2) -> Local imports (src.models).
Không Hardcode: Tuyệt đối không viết đường dẫn tuyệt đối (VD: C:/Users/Admin/data). Hãy sử dụng os.path.join hoặc thư viện pathlib và đọc từ file config.
Xử lý ngoại lệ: Luôn dùng try-except khi load model, load ảnh hoặc request API.
Formatting: Sử dụng Black hoặc Flake8 để format code tự động trước khi commit.

# 4. Commit Message
Viết commit message bằng tiếng Anh (khuyến khích) hoặc tiếng Việt, nhưng phải tuân thủ prefix:
**feat**: Tính năng mới (VD: feat: add retinaface detector)
**fix**: Sửa lỗi (VD: fix: dataloader memory leak)
**docs**: Thay đổi tài liệu
**refactor**: Sửa code nhưng không đổi logic (tối ưu, đổi tên biến)
**chore**: Các việc vặt (update requirements, gitignore)
-----------------------------------------------------------------------------------------------------
**Lưu ý: Chạy lệnh pip install -r requirements.txt để cài đặt môi trường trước khi bắt đầu.**
