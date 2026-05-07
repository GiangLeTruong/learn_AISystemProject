require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const cron = require('node-cron');
const app = express();
const port = process.env.PORT || 5100;
const RecommendationController = require('./services/cartService');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(cors());
//Customers routes:
app.use('/auth', require('./routes/authenticationRoute'));
// app.use('/users', require('./routes/userRoute'));
// app.use('/roles', require('./routes/roleRoute'));

// Businesses routes
app.use('/products', require('./routes/productRoute'));
// app.use('/payments', require('./routes/paymentRoute'));
app.use('/orders', require('./routes/orderRoute'));
app.use('/carts', require('./routes/cartRoute'));
// app.use('/addresses', require('./routes/addressRoute'));
// app.use('/trackingDetails', require('./routes/trackingDetailRoute'));
// app.use('/productCategories', require('./routes/productCategoryRoute'));
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
  console.log(`Ctrl + click to open http://localhost:${port}/`);
});

module.exports = app;
