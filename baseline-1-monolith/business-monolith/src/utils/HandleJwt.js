'use strict';
const jwt = require('jsonwebtoken');
require('dotenv').config();

const ACCESS_TOKEN_KEY = process.env.SERVER_ACCESS_TOKEN_KEY;

if (!ACCESS_TOKEN_KEY) {
  throw new Error('SERVER_TOKEN_KEY is not defined in .env');
}

function signAccessToken(payload, expiresIn = '900m') {
  return jwt.sign(payload, ACCESS_TOKEN_KEY, { expiresIn });
}

module.exports = { signAccessToken };
