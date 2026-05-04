const express = require('express');

const controller = require('../controllers/authenticationController');

const { verifyAccessToken } = require('../middleware/VerifyToken');

const router = express.Router();

// public routes
router.post('/login', controller.login);

module.exports = router;
