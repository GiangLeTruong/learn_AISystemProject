from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional
import pandas as pd
from surprise import Reader, Dataset, SVD

# Khởi tạo FastAPI
app = FastAPI(title="AI Recommendation Service", description="Gợi ý sản phẩm cho Web ERP")

# --- KẾT CẤU DỮ LIỆU ĐẦU VÀO (PYDANTIC) ---
class OrderRecord(BaseModel):
    userId: int
    productId: int
    rating: float # Điểm đánh giá ngầm (VD: số lần mua, hoặc mặc định là 5 nếu đã mua)

class TrainRequest(BaseModel):
    data: List[OrderRecord]

class PredictRequest(BaseModel):
    userId: int
    topN: int = 5

# --- LỚP RECOMMENDER ---
class CollaborativeRecommender:
    def __init__(self):
        self.model = SVD()
        self.trainset = None
        self.ratings_df = None
        self.all_products = []
        self.is_trained = False

    def train(self, df: pd.DataFrame):
        self.ratings_df = df
        self.all_products = df['productId'].unique().tolist()
        
        # Reader giới hạn thang điểm, giả sử ta truyền rating từ 1 đến 5
        reader = Reader(rating_scale=(1, 5))
        data = Dataset.load_from_df(self.ratings_df[['userId', 'productId', 'rating']], reader)
        
        self.trainset = data.build_full_trainset()
        self.model.fit(self.trainset)
        self.is_trained = True
        print(f"--> Đã train xong! Dữ liệu: {len(df)} dòng, {len(self.all_products)} sản phẩm.")

    def get_recommendations(self, user_id: int, n: int = 5):
        if not self.is_trained:
            return []

        # Tìm các sản phẩm user này đã mua
        if user_id in self.ratings_df['userId'].values:
            bought = self.ratings_df[self.ratings_df['userId'] == user_id]['productId'].tolist()
        else:
            bought = [] # User mới tinh (Cold Start)

        # Lọc ra các sản phẩm CHƯA mua
        unbought = [p for p in self.all_products if p not in bought]
        
        # Nếu user mới tinh (Cold Start), SVD sẽ dự đoán dựa trên điểm trung bình toàn hệ thống
        predictions = [self.model.predict(user_id, p_id) for p_id in unbought]
        predictions.sort(key=lambda x: x.est, reverse=True)
        
        # Lấy top N ID sản phẩm
        top_ids = [p.iid for p in predictions[:n]]
        return top_ids

# Biến toàn cục lưu model
recommender = CollaborativeRecommender()

# --- CÁC ENDPOINT API ---

@app.post("/api/v1/recommend/train")
def train_model(request: TrainRequest):
    """API nhận lịch sử mua hàng từ Node.js để huấn luyện mô hình"""
    if not request.data:
        raise HTTPException(status_code=400, detail="Không có dữ liệu để train")
    
    # Chuyển JSON thành Pandas DataFrame
    data_dicts = [{"userId": d.userId, "productId": d.productId, "rating": d.rating} for d in request.data]
    df = pd.DataFrame(data_dicts)
    
    try:
        recommender.train(df)
        return {"success": True, "message": "Huấn luyện mô hình thành công!"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/v1/recommend/predict")
def predict(request: PredictRequest):
    """API trả về danh sách ID sản phẩm gợi ý cho User"""
    if not recommender.is_trained:
        # Nếu chưa train, bạn có thể thiết lập trả về top sản phẩm bán chạy nhất thay vì lỗi
        return {"success": False, "message": "Model chưa được huấn luyện. Vui lòng gọi API train trước."}
    
    try:
        recommended_ids = recommender.get_recommendations(user_id=request.userId, n=request.topN)
        return {
            "success": True,
            "data": {
                "userId": request.userId,
                "recommendedProductIds": recommended_ids
            }
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))