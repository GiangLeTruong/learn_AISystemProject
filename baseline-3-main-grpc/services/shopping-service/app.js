require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cron = require('node-cron');
const app = express();
const port = process.env.PORT || 7102;
const RecommendationController = require('./services/cartService');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Businesses routes
app.use('/products', require('./routes/productRoute'));
app.use('/orders', require('./routes/orderRoute'));
app.use('/carts', require('./routes/cartRoute'));

// Cấu hình chạy tự động vào 02:00 AM mỗi ngày
cron.schedule('0 2 * * *', async () => {
  console.log('[CRON JOB] Đang chạy tự động đồng bộ dữ liệu AI Recommendation...');
  try {
    // Vì hàm controller ban đầu viết cho Req/Res của Express,
    // Nên để gọi ngầm ta truyền object rỗng hoặc tách hàm core ra
    await RecommendationController.recommenderTrainCart({}, {
      status: () => ({ json: (data) => console.log('Kết quả Sync:', data) })
    });
  } catch (err) {
    console.error('[CRON JOB LỖI]', err);
  }
});

app.listen(port, () => {
  console.log(`Ctrl + click to open Shopping Service http://localhost:${port}/`);
});

module.exports = app;
