const { ERROR_TYPES } = require('./apiError');

const AUTH_RESPONSES = {
  // Success
  LOGIN_SUCCESS: {
    errorCode: 0,
    errorType: 'SUCCESS',
    message: 'Đăng nhập thành công.',
  },
  REFRESH_TOKEN_SUCCESS: {
    errorCode: 0,
    errorType: 'SUCCESS',
    message: 'Đăng ký Access Token mới thành công.',
  },
  CHANGE_PASSWORD_SUCCESS: {
    errorCode: 0,
    errorType: 'SUCCESS',
    message: 'Đổi mật khẩu thành công.',
  },
  LOGOUT_SUCCESS: {
    errorCode: 0,
    errorType: 'SUCCESS',
    message: 'Đăng xuất thành công.',
  },
  GET_PROFILE_SUCCESS: {
    errorCode: 0,
    errorType: 'SUCCESS',
    message: 'Lấy thông tin người dùng thành công.',
  },
  UPDATE_PROFILE_SUCCESS: {
    errorCode: 0,
    errorType: 'SUCCESS',
    message: 'Cập nhật thông tin người dùng thành công.',
  },

  // Authentication errors
  USER_NOT_FOUND: {
    errorCode: 1,
    errorType: ERROR_TYPES.UNAUTHORIZED,
    message: 'Sai username/email hoặc tài khoản không tồn tại.',
  },
  WRONG_PASSWORD: {
    errorCode: 1,
    errorType: ERROR_TYPES.UNAUTHORIZED,
    message: 'Sai mật khẩu.',
  },
  USER_DISABLED: {
    errorCode: 1,
    errorType: ERROR_TYPES.FORBIDDEN,
    message: 'Tài khoản của bạn đã bị khóa, vui lòng liên hệ với quản trị viên để được giải quyết.',
  },
  PROFILE_NOT_FOUND: {
    errorCode: 1,
    errorType: ERROR_TYPES.NOT_FOUND,
    message: 'Không tìm thấy thông tin người dùng.',
  },
  UPDATE_ERROR: {
    errorCode: 1,
    errorType: ERROR_TYPES.INTERNAL_SERVER_ERROR,
    message: 'Lỗi khi cập nhật thông tin người dùng.',
  },

  // Internal server errors
  FILE_MISSING: {
    errorCode: 1,
    errorType: ERROR_TYPES.INTERNAL_SERVER_ERROR,
    message: 'Vui lòng cung cấp ảnh khuôn mặt.',
  },

  LOGIN_ERROR: {
    errorCode: 1,
    errorType: ERROR_TYPES.INTERNAL_SERVER_ERROR,
    message: 'Đã xảy ra lỗi trong quá trình đăng nhập.',
  },
  REFRESH_TOKEN_ERROR: {
    errorCode: 1,
    errorType: 'INTERNAL_SERVER_ERROR',
    message: 'Đã xảy ra lỗi trong quá trình đăng ký Access Token mới.',
  },
  CHANGE_PASSWORD_ERROR: {
    errorCode: 1,
    errorType: ERROR_TYPES.INTERNAL_SERVER_ERROR,
    message: 'Đã xảy ra lỗi trong quá trình đổi mật khẩu.',
  },
  REFRESH_TOKEN_MISSING: {
    errorCode: 1,
    errorType: ERROR_TYPES.UNAUTHORIZED,
    message: 'Không tìm thấy Refresh Token.',
  },
};

module.exports = { AUTH_RESPONSES };
