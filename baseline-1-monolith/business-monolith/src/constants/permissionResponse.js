const { ERROR_TYPES } = require('./apiError');

const PERMISSION_RESPONSES = {
  // Success
  CREATE_SUCCESS: { errorCode: 0, errorType: 'SUCCESS', message: 'Tạo Permission thành công.' },
  READ_SUCCESS: {
    errorCode: 0,
    errorType: 'SUCCESS',
    message: 'Lấy thông tin Permission thành công.',
  },
  UPDATE_SUCCESS: {
    errorCode: 0,
    errorType: 'SUCCESS',
    message: 'Cập nhật Permission thành công.',
  },
  DELETE_SUCCESS: { errorCode: 0, errorType: 'SUCCESS', message: 'Xóa Permission thành công.' },

  // Errors
  PERMISSION_CONFLICT: {
    errorCode: 1,
    errorType: ERROR_TYPES.CONFLICT,
    message: 'Permission đã tồn tại trong hệ thống.',
  },
  PERMISSION_NOT_FOUND: {
    errorCode: 1,
    errorType: ERROR_TYPES.NOT_FOUND,
    message: 'Không tìm thấy thông tin Permission.',
  },

  // Internal Server Errors
  CREATE_ERROR: {
    errorCode: 1,
    errorType: ERROR_TYPES.INTERNAL_SERVER_ERROR,
    message: 'Đã xảy ra lỗi trong quá trình tạo Permission.',
  },
  READ_ERROR: {
    errorCode: 1,
    errorType: ERROR_TYPES.INTERNAL_SERVER_ERROR,
    message: 'Đã xảy ra lỗi trong quá trình truy xuất thông tin Permission.',
  },
  UPDATE_ERROR: {
    errorCode: 1,
    errorType: ERROR_TYPES.INTERNAL_SERVER_ERROR,
    message: 'Đã xảy ra lỗi trong quá trình cập nhật thông tin Permission.',
  },
  DELETE_ERROR: {
    errorCode: 1,
    errorType: ERROR_TYPES.INTERNAL_SERVER_ERROR,
    message: 'Đã xảy ra lỗi trong quá trình xóa thông tin Permission.',
  },
};

module.exports = { PERMISSION_RESPONSES };
