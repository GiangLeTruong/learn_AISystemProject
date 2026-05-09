const express = require('express');
const multer = require('multer');
const controller = require('../controllers/authenticationController');

const { verifyAccessToken } = require('../middleware/VerifyToken');

const router = express.Router();

const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB
});

// public routes
router.post('/login', controller.login);

// Endpoint: POST /api/auth/login-face
router.post('/login-face', upload.single('file'), controller.loginWithFace);

// Test extract user form AIP Gateway
router.use(verifyAccessToken);
router.get('/testExtract', (req, res) => {
    console.log("Header nhận được từ Gateway:", req.headers['x-gateway-auth']);
    res.json({ message: "Chào Giang, tôi là Service con giả lập đây!" });
});


module.exports = router;
