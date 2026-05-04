'use strict';
const models = require('../models');
require('dotenv').config();
const { signAccessToken, signRefreshToken, verifyRefreshToken } = require('../utils/HandleJwt');
const util = require('../utils/helperFuncs');
const { AUTH_RESPONSES } = require('../constants/authResponse');
const { Op } = require('sequelize');
const service = {};


service.login = async (payload, res) => {
  try {
    const { identifier, password } = payload;
    const user = await models.User.findOne({
      where: {
        [Op.or]: [{ name: identifier }, { email: identifier }],
      },
    });

    if (!user) {
      return {
        error: AUTH_RESPONSES.USER_NOT_FOUND.errorCode,
        errorType: AUTH_RESPONSES.USER_NOT_FOUND.errorType,
        message: AUTH_RESPONSES.USER_NOT_FOUND.message,
      };
    }

    const isPasswordValid = await util.comparePassword(password, user.password);
    if (!isPasswordValid) {
      return {
        error: AUTH_RESPONSES.WRONG_PASSWORD.errorCode,
        errorType: AUTH_RESPONSES.WRONG_PASSWORD.errorType,
        message: AUTH_RESPONSES.WRONG_PASSWORD.message,
      };
    }

    const signPayload = {
      id: user.id,
      name: user.name,
    };

    const accessToken = signAccessToken(signPayload);

    const safeUserData = {
      id: user.id,
      name: user.name,
      email: user.email,
    };
    return {
      error: AUTH_RESPONSES.LOGIN_SUCCESS.errorCode,
      errorType: AUTH_RESPONSES.LOGIN_SUCCESS.errorType,
      message: AUTH_RESPONSES.LOGIN_SUCCESS.message,
      resData: {
        accessToken,
        user: safeUserData,
      },
    };
  } catch (error) {
    console.error('Error in service.login:', error);
    return {
      error: AUTH_RESPONSES.LOGIN_ERROR.errorCode,
      errorType: AUTH_RESPONSES.LOGIN_ERROR.errorType,
      message: AUTH_RESPONSES.LOGIN_ERROR.message,
    };
  }
};

module.exports = service;
