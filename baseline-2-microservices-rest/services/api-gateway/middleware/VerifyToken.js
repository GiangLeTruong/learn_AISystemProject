const jwt = require('jsonwebtoken');
require('dotenv').config();
const { API_ERRORS } = require('../constants/apiError');
const { HTTP_STATUS } = require('../constants/httpStatus');

const ACCESS_TOKEN_KEY = process.env.SERVER_ACCESS_TOKEN_KEY;

const verifyAccessToken = (req, res, next) => {
  const token = req.headers.authorization || req.headers['x-access-token'];
  if (!token) {
    return res.status(HTTP_STATUS.UNAUTHORIZED).json({
      code: API_ERRORS.API_ERROR_001_REQUEST_TOKEN.status,
      message: API_ERRORS.API_ERROR_001_REQUEST_TOKEN.message,
    });
  }
  const accessToken = token.split(' ')[1];
  jwt.verify(accessToken, ACCESS_TOKEN_KEY, (error, user) => {
    if (error) {
      if (error.name === 'TokenExpiredError') {
        const expiredPayload = jwt.decode(accessToken);
        return res.status(HTTP_STATUS.INVALID_TOKEN).json({
          code: API_ERRORS.API_ERROR_003_EXPIRED_TOKEN.status,
          message: API_ERRORS.API_ERROR_003_EXPIRED_TOKEN.message,
          expiredPayload,
        });
      }

      return res.status(HTTP_STATUS.INVALID_TOKEN).json({
        code: API_ERRORS.API_ERROR_002_INVALID_TOKEN.status,
        message: API_ERRORS.API_ERROR_002_INVALID_TOKEN.message,
      });
    }
    req.user = user;
    next();
  });
};

module.exports = { verifyAccessToken };
