const { ERROR_TYPES } = require('./apiError');

const USER_RESPONSES = {
  // Success
  CREATE_SUCCESS: {
    errorCode: 0,
    errorType: 'SUCCESS',
    message: 'Tạo người dùng thành công.',
  },
  READ_SUCCESS: {
    errorCode: 0,
    errorType: 'SUCCESS',
    message: 'Lấy thông tin người dùng thành công.',
  },
  UPDATE_SUCCESS: {
    errorCode: 0,
    errorType: 'SUCCESS',
    message: 'Cập nhật người dùng thành công.',
  },
  DELETE_SUCCESS: { errorCode: 0, errorType: 'SUCCESS', message: 'Xóa người dùng thành công.' },
  ASSIGN_ROLE_SUCCESS: {
    errorCode: 0,
    errorType: 'SUCCESS',
    message: 'Gán Role cho người dùng thành công.',
  },
  REMOVE_ROLE_SUCCESS: {
    errorCode: 0,
    errorType: 'SUCCESS',
    message: 'Xóa Role của người dùng thành công.',
  },

  // Errors
  USER_CONFLICT: {
    errorCode: 1,
    errorType: ERROR_TYPES.CONFLICT,
    message: 'Cá nhân đã tồn tại trong hệ thống.',
  },
  USER_NOT_FOUND: {
    errorCode: 1,
    errorType: ERROR_TYPES.NOT_FOUND,
    message: 'Không tìm thấy thông tin người dùng.',
  },
  USER_ROLE_CONFLICT: {
    errorCode: 1,
    errorType: ERROR_TYPES.CONFLICT,
    message: 'Người dùng đã có Role này.',
  },
  USER_ROLE_NOT_FOUND: {
    errorCode: 1,
    errorType: ERROR_TYPES.NOT_FOUND,
    message: 'Không tìm thấy thông tin người dùng có role này.',
  },

  // Internal Server Errors
  CREATE_ERROR: {
    errorCode: 1,
    errorType: ERROR_TYPES.INTERNAL_SERVER_ERROR,
    message: 'Đã xảy ra lỗi trong quá trình tạo người dùng.',
  },
  READ_ERROR: {
    errorCode: 1,
    errorType: ERROR_TYPES.INTERNAL_SERVER_ERROR,
    message: 'Đã xảy ra lỗi trong quá trình truy xuất thông tin người dùng.',
  },
  UPDATE_ERROR: {
    errorCode: 1,
    errorType: ERROR_TYPES.INTERNAL_SERVER_ERROR,
    message: 'Đã xảy ra lỗi trong quá trình cập nhật thông tin người dùng.',
  },
  DELETE_ERROR: {
    errorCode: 1,
    errorType: ERROR_TYPES.INTERNAL_SERVER_ERROR,
    message: 'Đã xảy ra lỗi trong quá trình xóa người dùng.',
  },
  ASSIGN_ROLE_ERROR: {
    errorCode: 1,
    errorType: ERROR_TYPES.INTERNAL_SERVER_ERROR,
    message: 'Đã xảy ra lỗi trong quá trình gán Role cho người dùng.',
  },
  REMOVE_ROLE_ERROR: {
    errorCode: 1,
    errorType: ERROR_TYPES.INTERNAL_SERVER_ERROR,
    message: 'Đã xảy ra lỗi trong quá trình xóa Role của người dùng.',
  },
};

module.exports = { USER_RESPONSES };
