const { ERROR_TYPES } = require('./apiError');

const ROLE_RESPONSES = {
  // Success
  CREATE_SUCCESS: { errorCode: 0, errorType: 'SUCCESS', message: 'Tạo Role thành công.' },
  READ_SUCCESS: { errorCode: 0, errorType: 'SUCCESS', message: 'Lấy thông tin Role thành công.' },
  UPDATE_SUCCESS: { errorCode: 0, errorType: 'SUCCESS', message: 'Cập nhật Role thành công.' },
  DELETE_SUCCESS: { errorCode: 0, errorType: 'SUCCESS', message: 'Xóa Role thành công.' },

  // Errors
  ROLE_CONFLICT: {
    errorCode: 1,
    errorType: ERROR_TYPES.CONFLICT,
    message: 'Role đã tồn tại trong hệ thống.',
  },
  ROLE_NOT_FOUND: {
    errorCode: 1,
    errorType: ERROR_TYPES.NOT_FOUND,
    message: 'Không tìm thấy thông tin Role.',
  },

  // Internal Server Errors
  CREATE_ERROR: {
    errorCode: 1,
    errorType: ERROR_TYPES.INTERNAL_SERVER_ERROR,
    message: 'Đã xảy ra lỗi trong quá trình tạo Role.',
  },
  READ_ERROR: {
    errorCode: 1,
    errorType: ERROR_TYPES.INTERNAL_SERVER_ERROR,
    message: 'Đã xảy ra lỗi trong quá trình truy xuất thông tin Role.',
  },
  UPDATE_ERROR: {
    errorCode: 1,
    errorType: ERROR_TYPES.INTERNAL_SERVER_ERROR,
    message: 'Đã xảy ra lỗi trong quá trình cập nhật thông tin Role.',
  },
  DELETE_ERROR: {
    errorCode: 1,
    errorType: ERROR_TYPES.INTERNAL_SERVER_ERROR,
    message: 'Đã xảy ra lỗi trong quá trình xóa Role.',
  },
};

module.exports = { ROLE_RESPONSES };
