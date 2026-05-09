import sys
import os
import grpc
from concurrent import futures
import pandas as pd
from surprise import Reader, Dataset, SVD

# BƯỚC VÁ LỖI ĐƯỜNG DẪN CHO PROTO (Giống hệt bên Face Service)
CURRENT_DIR = os.path.dirname(os.path.abspath(__file__))
sys.path.append(os.path.join(CURRENT_DIR, 'generated_protos'))

import recommend_service_pb2
import recommend_service_pb2_grpc

# --- LỚP RECOMMENDER (LÕI AI - GIỮ NGUYÊN 100%) ---
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
        
        # Reader giới hạn thang điểm
        reader = Reader(rating_scale=(1, 5))
        data = Dataset.load_from_df(self.ratings_df[['userId', 'productId', 'rating']], reader)
        
        self.trainset = data.build_full_trainset()
        self.model.fit(self.trainset)
        self.is_trained = True
        print(f"--> Đã train xong! Dữ liệu: {len(df)} dòng, {len(self.all_products)} sản phẩm.")

    def get_recommendations(self, user_id: int, n: int = 5):
        if not self.is_trained:
            return []

        if user_id in self.ratings_df['userId'].values:
            bought = self.ratings_df[self.ratings_df['userId'] == user_id]['productId'].tolist()
        else:
            bought = [] # User mới tinh (Cold Start)

        unbought = [p for p in self.all_products if p not in bought]
        
        predictions = [self.model.predict(user_id, p_id) for p_id in unbought]
        predictions.sort(key=lambda x: x.est, reverse=True)
        
        top_ids = [p.iid for p in predictions[:n]]
        return top_ids

# Biến toàn cục lưu model
recommender = CollaborativeRecommender()

# --- ĐỊNH NGHĨA CLASS SERVICE gRPC ---
class AiRecommendServiceServicer(recommend_service_pb2_grpc.AiRecommendServiceServicer):
    
    # 1. HÀM NHẬN LỆNH TRAIN TỪ NODE.JS
    def TrainModel(self, request, context):
        try:
            # Lấy mảng dữ liệu từ request (trường 'data' có từ khóa 'repeated' trong proto)
            raw_data = request.data
            
            if not raw_data or len(raw_data) == 0:
                return recommend_service_pb2.TrainResponse(
                    success=False,
                    message="Không có dữ liệu để train",
                    details="Danh sách mảng rỗng."
                )

            # Chuyển đổi dữ liệu từ gRPC Array sang Pandas DataFrame cực mượt
            data_dicts = [
                {"userId": item.user_id, "productId": item.product_id, "rating": item.rating} 
                for item in raw_data
            ]
            df = pd.DataFrame(data_dicts)
            
            # Đưa vào lõi AI để huấn luyện
            recommender.train(df)
            
            return recommend_service_pb2.TrainResponse(
                success=True,
                message="Huấn luyện mô hình thành công!",
                details=f"Model SVD đã học xong với {len(df)} bản ghi."
            )
            
        except Exception as e:
            print(f"Lỗi Train AI: {e}")
            return recommend_service_pb2.TrainResponse(success=False, message=str(e), details="")

    # 2. HÀM DỰ ĐOÁN SẢN PHẨM TRẢ VỀ NODE.JS
    def PredictRecommendation(self, request, context):
        try:
            if not recommender.is_trained:
                return recommend_service_pb2.PredictResponse(
                    success=False,
                    message="Model chưa được huấn luyện. Vui lòng gọi hàm Train trước.",
                    recommended_product_ids=[] # Trả về mảng rỗng
                )
            
            # Lấy thông tin từ request
            user_id = request.user_id
            top_n = request.top_n
            
            # Gọi thuật toán dự đoán
            recommended_ids = recommender.get_recommendations(user_id=user_id, n=top_n)
            
            # Trả về kết quả (gRPC tự động hiểu List Python là mảng 'repeated int32')
            return recommend_service_pb2.PredictResponse(
                success=True,
                message="Gợi ý sản phẩm thành công",
                recommended_product_ids=recommended_ids
            )
            
        except Exception as e:
            print(f"Lỗi Predict AI: {e}")
            return recommend_service_pb2.PredictResponse(
                success=False,
                message=str(e),
                recommended_product_ids=[]
            )

# --- KHỞI ĐỘNG SERVER ---
def serve():
    # Service gợi ý chạy cổng 6105
    port = '7105'
    
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    recommend_service_pb2_grpc.add_AiRecommendServiceServicer_to_server(AiRecommendServiceServicer(), server)
    
    server.add_insecure_port(f'[::]:{port}')
    server.start()
    print(f"🚀 AI Recommend Service (gRPC) đang lắng nghe tại cổng {port}...")
    
    server.wait_for_termination()

if __name__ == '__main__':
    serve()