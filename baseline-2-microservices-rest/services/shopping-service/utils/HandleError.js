'use strict';
const { API_ERRORS } = require('../constants/apiError');
const { HTTP_STATUS } = require('../constants/httpStatus');

const handleServerError = async (res, error) => {
  return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
    code: API_ERRORS.API_ERROR_000_INTERNAL_SERVER_ERROR.status,
    message: API_ERRORS.API_ERROR_000_INTERNAL_SERVER_ERROR.message,
  });
};

module.exports = { handleServerError };
