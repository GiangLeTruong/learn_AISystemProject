const { ERROR_TYPES } = require('./apiError');

const CUSTOMER_CONTACT_RESPONSES = {
  // Success
  CREATE_SUCCESS: {
    errorCode: 0,
    errorType: 'SUCCESS',
    message: 'Tạo quan hệ khách hàng - người liên hệ thành công.',
  },
  READ_SUCCESS: {
    errorCode: 0,
    errorType: 'SUCCESS',
    message: 'Lấy thông tin quan hệ khách hàng - người liên hệ thành công.',
  },
  UPDATE_SUCCESS: {
    errorCode: 0,
    errorType: 'SUCCESS',
    message: 'Cập nhật quan hệ khách hàng - người liên hệ thành công.',
  },
  DELETE_SUCCESS: {
    errorCode: 0,
    errorType: 'SUCCESS',
    message: 'Xóa quan hệ khách hàng - người liên hệ thành công.',
  },

  // Errors
  CUSTOMER_CONTACT_CONFLICT: {
    errorCode: 1,
    errorType: ERROR_TYPES.CONFLICT,
    message: 'Quan hệ khách hàng - người liên hệ đã tồn tại trong hệ thống.',
  },
  CUSTOMER_CONTACT_NOT_FOUND: {
    errorCode: 1,
    errorType: ERROR_TYPES.NOT_FOUND,
    message: 'Không tìm thấy thông tin quan hệ khách hàng - người liên hệ.',
  },

  // Internal Server Errors
  CREATE_ERROR: {
    errorCode: 1,
    errorType: ERROR_TYPES.INTERNAL_SERVER_ERROR,
    message: 'Đã xảy ra lỗi trong quá trình tạo quan hệ khách hàng - người liên hệ.',
  },
  READ_ERROR: {
    errorCode: 1,
    errorType: ERROR_TYPES.INTERNAL_SERVER_ERROR,
    message:
      'Đã xảy ra lỗi trong quá trình truy xuất thông tin quan hệ khách hàng - người liên hệ.',
  },
  UPDATE_ERROR: {
    errorCode: 1,
    errorType: ERROR_TYPES.INTERNAL_SERVER_ERROR,
    message: 'Đã xảy ra lỗi trong quá trình cập nhật thông tin quan hệ khách hàng - người liên hệ.',
  },
  DELETE_ERROR: {
    errorCode: 1,
    errorType: ERROR_TYPES.INTERNAL_SERVER_ERROR,
    message: 'Đã xảy ra lỗi trong quá trình xóa quan hệ khách hàng - người liên hệ.',
  },
};

module.exports = { CUSTOMER_CONTACT_RESPONSES };
