const express = require('express');

const controller = require('../controllers/productController');

const { verifyAccessToken } = require('../middleware/VerifyToken');

const router = express.Router();

// public routes
router.use(verifyAccessToken);
router.get('/', controller.getProducts);
router.get('/:id', controller.getProductById);

module.exports = router;
