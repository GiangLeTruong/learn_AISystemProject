const jwt = require('jsonwebtoken');
require('dotenv').config();
const { API_ERRORS } = require('../constants/apiError');
const { HTTP_STATUS } = require('../constants/httpStatus');

const ACCESS_TOKEN_KEY = process.env.SERVER_ACCESS_TOKEN_KEY;

const verifyAccessToken = (req, res, next) => {
  // Extract User from API Gateway:
  const userRaw = req.headers['x-user-info'];
  let userFromGateway = null;
  if (userRaw) {
    userFromGateway = JSON.parse(decodeURIComponent(userRaw));
  }

  req.user = userFromGateway;
  next();
};

module.exports = { verifyAccessToken };
