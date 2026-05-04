const { ERROR_TYPES } = require('./apiError');

const STATISTICS_RESPONSES = {
  // Success responses
  READ_SUCCESS: {
    errorCode: 0,
    errorType: 'SUCCESS',
    message: 'Lấy thông tin báo cáo thành công.',
  },

  // Error responses
  READ_ERROR: {
    errorCode: 1,
    errorType: ERROR_TYPES.INTERNAL_SERVER_ERROR,
    message: 'Đã xảy ra lỗi trong quá trình lấy thông tin báo cáo.',
  },

  INVALID_YEAR: {
    errorCode: 1,
    errorType: ERROR_TYPES.BAD_REQUEST,
    message: 'Năm không hợp lệ. Vui lòng nhập năm hợp lệ.',
  },

};

module.exports = { STATISTICS_RESPONSES };
