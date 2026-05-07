const express = require('express');

const controller = require('../controllers/orderController');

const { verifyAccessToken } = require('../middleware/VerifyToken');

const router = express.Router();

// public routes
router.use(verifyAccessToken);
router.post('/', controller.getOrders);
router.delete('/:orderId', controller.cancelOrder);
router.post('/:orderId/pay', controller.processOrderPayment);

module.exports = router;
