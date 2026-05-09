'use strict';
const handleError = require('../utils/HandleError');
const service = require('../services/authenticationService');
const { HTTP_STATUS } = require('../constants/httpStatus');
const { ERROR_TYPES } = require('../constants/apiError');
const controller = {};

controller.login = async (req, res) => {
  try {
    const payload = req.body;
    const response = await service.login(payload, res);

    if (response.error === 1 && response.errorType === ERROR_TYPES.UNAUTHORIZED) {
      return res.status(HTTP_STATUS.UNAUTHORIZED).json(response);
    }

    if (response.error === 1 && response.errorType === ERROR_TYPES.FORBIDDEN) {
      return res.status(HTTP_STATUS.FORBIDDEN).json(response);
    }

    if (response.error === 1 && response.errorType === ERROR_TYPES.INTERNAL_SERVER_ERROR) {
      return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(response);
    }
    return res.status(HTTP_STATUS.OK).json(response);
  } catch (error) {
    return handleError.handleServerError(res, error);
  }
};

controller.loginWithFace = async (req, res) => {
  try {
    const payload = req.file;
    const response = await service.loginWithFace(payload);

    if (response.error === 1 && response.errorType === ERROR_TYPES.UNAUTHORIZED) {
      return res.status(HTTP_STATUS.UNAUTHORIZED).json(response);
    }

    if (response.error === 1 && response.errorType === ERROR_TYPES.FORBIDDEN) {
      return res.status(HTTP_STATUS.FORBIDDEN).json(response);
    }

    if (response.error === 1 && response.errorType === ERROR_TYPES.INTERNAL_SERVER_ERROR) {
      return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(response);
    }
    return res.status(HTTP_STATUS.OK).json(response);
  } catch (error) {
    return handleError.handleServerError(res, error);
  }
};

module.exports = controller;
