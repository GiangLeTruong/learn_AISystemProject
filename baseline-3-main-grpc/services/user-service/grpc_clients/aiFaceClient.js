'use strict';
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');

const PROTO_PATH = path.resolve(__dirname, '../../../protos/face_service.proto');
const AI_FACE_GRPC_URL = process.env.AI_FACE_GRPC_URL || 'localhost:7104';

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
});

const faceProto = grpc.loadPackageDefinition(packageDefinition).face_recognition;

const client = new faceProto.AiFaceService(
    AI_FACE_GRPC_URL,
    grpc.credentials.createInsecure()
);

const verifyFace = (imageBuffer, filename, mimetype) => {
    return new Promise((resolve, reject) => {
        // Tham số truyền vào khớp 100% với FaceVerifyRequest trong .proto
        const requestPayload = {
            image_data: imageBuffer,
            filename: filename,
            mimetype: mimetype
        };

        client.VerifyFace(requestPayload, (error, response) => {
            if (error) {
                reject(error);
            } else {
                resolve(response);
            }
        });
    });
};

module.exports = { verifyFace };