const express = require('express');

const controller = require('../controllers/cartController');

const { verifyAccessToken } = require('../middleware/VerifyToken');

const router = express.Router();

// public routes
router.use(verifyAccessToken);
router.post('/', controller.getCarts);
router.post('/add', controller.addToCart);
router.post('/remove', controller.removeFromCart);
router.post('/clear', controller.clearCart);
router.post('/checkout', controller.checkoutCart);

//AI recommendation:
router.post('/recommender/train', controller.recommenderTrainCart);
router.post('/recommender/predict', controller.recommenderPredictCart);
module.exports = router;
