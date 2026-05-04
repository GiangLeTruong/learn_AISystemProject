require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(cors());
//Customers routes:
app.use('/auth', require('./routes/authenticationRoute'));
// app.use('/users', require('./routes/userRoute'));
// app.use('/roles', require('./routes/roleRoute'));

// Businesses routes
// app.use('/products', require('./routes/productRoute'));
// app.use('/payments', require('./routes/paymentRoute'));
// app.use('/orders', require('./routes/orderRoute'));
// app.use('/carts', require('./routes/cartRoute'));
// app.use('/addresses', require('./routes/addressRoute'));
// app.use('/trackingDetails', require('./routes/trackingDetailRoute'));
// app.use('/productCategories', require('./routes/productCategoryRoute'));

app.listen(port, () => {
  console.log(`Ctrl + click to open http://localhost:${port}/`);
});

module.exports = app;
