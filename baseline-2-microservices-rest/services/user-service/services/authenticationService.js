'use strict';
const models = require('../models');
require('dotenv').config();
const { signAccessToken } = require('../utils/HandleJwt');
const util = require('../utils/helperFuncs');
const { AUTH_RESPONSES } = require('../constants/authResponse');
const { Op } = require('sequelize');
const service = {};
const axios = require('axios');
const FormData = require('form-data');

const AI_FACE_URL = process.env.AI_FACE_URL;

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

service.loginWithFace = async (payload) => {
  try {
    if (!payload) {
      return {
        error: AUTH_RESPONSES.FILE_MISSING.errorCode,
        errorType: AUTH_RESPONSES.FILE_MISSING.errorType,
        message: AUTH_RESPONSES.FILE_MISSING.message,
      };
    }

    const formData = new FormData();
    // Đọc buffer từ RAM của Node.js gắn vào form
    formData.append('file', payload.buffer, {
      filename: payload.originalname,
      contentType: payload.mimetype
    });
    let aiResponse;
    try {
      aiResponse = await axios.post(AI_FACE_URL, formData, {
        headers: {
          ...formData.getHeaders() // Bắt buộc phải có header này khi gửi file bằng axios
        }
      });
    } catch (aiError) {
      console.error("Lỗi kết nối đến AI Service:", aiError.message);
      return {
        error: AUTH_RESPONSES.LOGIN_ERROR.errorCode,
        errorType: AUTH_RESPONSES.LOGIN_ERROR.errorType,
        message: 'Dịch vụ AI đang tạm ngưng. Vui lòng thử lại sau.',
      };
    }
    const aiData = aiResponse.data;
    if (aiData.success && aiData.data.status === 'MATCHED') {
      const userEmail = aiData.data.userId;
      const user = await models.User.findOne({ where: { email: userEmail } });
      if (!user) {
        return {
          error: AUTH_RESPONSES.USER_NOT_FOUND.errorCode,
          errorType: AUTH_RESPONSES.USER_NOT_FOUND.errorType,
          message: 'Nhận diện khuôn mặt không thành công. Vui lòng thử lại sau.',
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
    } else {
      return {
        error: AUTH_RESPONSES.LOGIN_ERROR.errorCode,
        errorType: AUTH_RESPONSES.LOGIN_ERROR.errorType,
        message: 'Nhận diện khuôn mặt không thành công. Vui lòng thử lại sau.',
      };
    }

  } catch (error) {
    console.error('Error in service.login:', error);
    return {
      error: AUTH_RESPONSES.LOGIN_ERROR.errorCode,
      errorType: AUTH_RESPONSES.LOGIN_ERROR.errorType,
      message: 'Nhận diện khuôn mặt không thành công. Vui lòng thử lại sau.',
    };
  }
};

module.exports = service;
