const { ERROR_TYPES } = require('./apiError');

const PAYMENT_RESPONSES = {
  // Success
  CREATE_SUCCESS: { errorCode: 0, errorType: 'SUCCESS', message: 'Tạo thanh toán thành công.' },
  READ_SUCCESS: {
    errorCode: 0,
    errorType: 'SUCCESS',
    message: 'Lấy thông tin thanh toán thành công.',
  },
  UPDATE_SUCCESS: {
    errorCode: 0,
    errorType: 'SUCCESS',
    message: 'Cập nhật thanh toán thành công.',
  },
  DELETE_SUCCESS: { errorCode: 0, errorType: 'SUCCESS', message: 'Xóa thanh toán thành công.' },

  // Errors
  PAYMENT_CONFLICT: {
    errorCode: 1,
    errorType: ERROR_TYPES.CONFLICT,
    message: 'Thanh toán đã tồn tại trong hệ thống.',
  },
  PAYMENT_NOT_FOUND: {
    errorCode: 1,
    errorType: ERROR_TYPES.NOT_FOUND,
    message: 'Không tìm thấy thông tin thanh toán.',
  },

  // Internal Server Errors
  CREATE_ERROR: {
    errorCode: 1,
    errorType: ERROR_TYPES.INTERNAL_SERVER_ERROR,
    message: 'Đã xảy ra lỗi trong quá trình tạo thanh toán.',
  },
  READ_ERROR: {
    errorCode: 1,
    errorType: ERROR_TYPES.INTERNAL_SERVER_ERROR,
    message: 'Đã xảy ra lỗi trong quá trình truy xuất thông tin thanh toán.',
  },
  UPDATE_ERROR: {
    errorCode: 1,
    errorType: ERROR_TYPES.INTERNAL_SERVER_ERROR,
    message: 'Đã xảy ra lỗi trong quá trình cập nhật thông tin thanh toán.',
  },
  DELETE_ERROR: {
    errorCode: 1,
    errorType: ERROR_TYPES.INTERNAL_SERVER_ERROR,
    message: 'Đã xảy ra lỗi trong quá trình xóa thanh toán.',
  },
};

module.exports = { PAYMENT_RESPONSES };
