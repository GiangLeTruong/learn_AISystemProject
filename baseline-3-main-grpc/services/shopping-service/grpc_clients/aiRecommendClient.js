'use strict';
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');

// Trỏ về thư mục protos gốc
const PROTO_PATH = path.resolve(__dirname, '../../../protos/recommend_service.proto');
const AI_RECOMMEND_GRPC_URL = process.env.AI_RECOMMEND_GRPC_URL || 'localhost:7105';

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
});

const recommendProto = grpc.loadPackageDefinition(packageDefinition).recommend_system;

// Khởi tạo Client
const client = new recommendProto.AiRecommendService(
    AI_RECOMMEND_GRPC_URL,
    grpc.credentials.createInsecure()
);

// Bọc hàm Train lại bằng Promise
const trainModel = (trainingData) => {
    return new Promise((resolve, reject) => {
        // Ánh xạ tên biến để khớp với file .proto (userId -> user_id)
        const formattedData = trainingData.map(item => ({
            user_id: item.userId,
            product_id: item.productId,
            rating: item.rating
        }));

        const requestPayload = { data: formattedData };

        client.TrainModel(requestPayload, (error, response) => {
            if (error) reject(error);
            else resolve(response);
        });
    });
};

// Bọc hàm Predict lại bằng Promise
const predictRecommendation = (userId, topN) => {
    return new Promise((resolve, reject) => {
        const requestPayload = {
            user_id: userId,
            top_n: topN
        };

        client.PredictRecommendation(requestPayload, (error, response) => {
            if (error) reject(error);
            else resolve(response);
        });
    });
};

module.exports = { trainModel, predictRecommendation };