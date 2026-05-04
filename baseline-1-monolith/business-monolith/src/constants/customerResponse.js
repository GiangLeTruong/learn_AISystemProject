const { ERROR_TYPES } = require('./apiError');

const CUSTOMER_RESPONSES = {
  // Success
  CREATE_SUCCESS: { errorCode: 0, errorType: 'SUCCESS', message: 'Tạo khách hàng thành công.' },
  READ_SUCCESS: {
    errorCode: 0,
    errorType: 'SUCCESS',
    message: 'Lấy thông tin khách hàng thành công.',
  },
  UPDATE_SUCCESS: {
    errorCode: 0,
    errorType: 'SUCCESS',
    message: 'Cập nhật khách hàng thành công.',
  },
  DELETE_SUCCESS: { errorCode: 0, errorType: 'SUCCESS', message: 'Xóa khách hàng thành công.' },

  // Errors
  CUSTOMER_CONFLICT: {
    errorCode: 1,
    errorType: ERROR_TYPES.CONFLICT,
    message: 'Khách hàng đã tồn tại trong hệ thống.',
  },
  CUSTOMER_NOT_FOUND: {
    errorCode: 1,
    errorType: ERROR_TYPES.NOT_FOUND,
    message: 'Không tìm thấy thông tin khách hàng.',
  },

  // Internal Server Errors
  CREATE_ERROR: {
    errorCode: 1,
    errorType: ERROR_TYPES.INTERNAL_SERVER_ERROR,
    message: 'Đã xảy ra lỗi trong quá trình tạo khách hàng.',
  },
  READ_ERROR: {
    errorCode: 1,
    errorType: ERROR_TYPES.INTERNAL_SERVER_ERROR,
    message: 'Đã xảy ra lỗi trong quá trình truy xuất thông tin khách hàng.',
  },
  UPDATE_ERROR: {
    errorCode: 1,
    errorType: ERROR_TYPES.INTERNAL_SERVER_ERROR,
    message: 'Đã xảy ra lỗi trong quá trình cập nhật thông tin khách hàng.',
  },
  DELETE_ERROR: {
    errorCode: 1,
    errorType: ERROR_TYPES.INTERNAL_SERVER_ERROR,
    message: 'Đã xảy ra lỗi trong quá trình xóa khách hàng.',
  },
};

module.exports = { CUSTOMER_RESPONSES };
