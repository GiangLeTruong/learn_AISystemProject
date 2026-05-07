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

module.exports = router;
