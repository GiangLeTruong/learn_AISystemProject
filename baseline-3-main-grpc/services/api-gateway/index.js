const express = require('express');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');
require('dotenv').config();
const { verifyAccessToken } = require('./middleware/VerifyToken')
const app = express();
const PORT = process.env.PORT || 7100;

// 1. Cấu hình CORS để Frontend có thể gọi vào
app.use(cors());

const authMiddleware = (req, res, next) => {
    const publicPaths = ['/api/auth/login', '/api/auth/login-face', '/health'];
    if (publicPaths.includes(req.path)) return next();

    return verifyAccessToken(req, res, next);
};

app.use(authMiddleware);

// 2. Danh sách định tuyến (Routing Table)
// Lưu ý: Khi chạy Docker, 'target' sẽ là tên Service trong file docker-compose
const routes = {
    '/api/auth': 'http://localhost:7101', //user-service
    '/api/': 'http://localhost:7102', //shopping-service
};
// 3. Thiết lập Proxy cho từng route
Object.entries(routes).forEach(([path, target]) => {
    app.use(path, createProxyMiddleware({
        target: target,
        changeOrigin: true,
        pathRewrite: { [`^${path}`]: '' },

        // BẮT BUỘC DÙNG CÚ PHÁP MỚI CỦA BẢN V3: bọc trong object "on"
        on: {
            proxyReq: (proxyReq, req, res) => {

                // Đánh dấu request đến từ Gateway uy tín
                proxyReq.setHeader('x-gateway-auth', 'ERP-GATEWAY-SECRET');

                // QUAN TRỌNG: Đẩy UserID sang Service con qua Header
                if (req.user) {
                    const userInfo = encodeURIComponent(JSON.stringify(req.user));
                    proxyReq.setHeader('x-user-info', userInfo);
                }
            },
            error: (err, req, res) => {
                // SỬA LỖI TREO REQUEST: Phải dùng res.status().json()
                res.status(500).json({
                    error: 1,
                    errorType: 'INTERNAL_SERVER_ERROR',
                    message: 'Service con (6101) không phản hồi. Hãy chắc chắn service đã chạy.'
                });
            }
        }
    }));
});

app.get('/health', (req, res) => {
    res.json({ status: 'Gateway is running', timestamp: new Date() });
});

app.listen(PORT, () => {
    console.log(`Ctrl + click to open http://localhost:${PORT}`);
});