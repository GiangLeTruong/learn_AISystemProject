const { ERROR_TYPES } = require('./apiError');

const PROJECT_ASSIGNMENT_RESPONSES = {
  // Success
  ASSIGN_PROJECT_SUCCESS: {
    errorCode: 0,
    errorType: 'SUCCESS',
    message: 'Phân công dự án thành công',
  },
  READ_PROJECT_ASSIGNMENT_SUCCESS: {
    errorCode: 0,
    errorType: 'SUCCESS',
    message: 'Lấy thông tin phân công dự án thành công.',
  },
  UPDATE_PROJECT_ASSIGNMENT_SUCCESS: {
    errorCode: 0,
    errorType: 'SUCCESS',
    message: 'Cập nhật phân công dự án thành công.',
  },
  REMOVE_PROJECT_ASSIGNMENT_SUCCESS: {
    errorCode: 0,
    errorType: 'SUCCESS',
    message: 'Hủy phân công dự án thành công.',
  },

  // Errors
  PROJECT_ASSIGNMENT_CONFLICT: {
    errorCode: 1,
    errorType: ERROR_TYPES.CONFLICT,
    message: 'Dự án đã được phân công cho người dùng này.',
  },
  PROJECT_ASSIGNMENT_NOT_FOUND: {
    errorCode: 1,
    errorType: ERROR_TYPES.NOT_FOUND,
    message: 'Không tìm thấy thông tin phân công dự án của người dùng này.',
  },

  // Internal Server Errors
  ASSIGN_PROJECT_ERROR: {
    errorCode: 1,
    errorType: ERROR_TYPES.INTERNAL_SERVER_ERROR,
    message: 'Đã xảy ra lỗi trong quá trình phân công dự án.',
  },
  READ_PROJECT_ASSIGNMENT_ERROR: {
    errorCode: 1,
    errorType: ERROR_TYPES.INTERNAL_SERVER_ERROR,
    message: 'Đã xảy ra lỗi trong quá trình truy xuất thông tin phân công dự án.',
  },
  UPDATE_PROJECT_ASSIGNMENT_ERROR: {
    errorCode: 1,
    errorType: ERROR_TYPES.INTERNAL_SERVER_ERROR,
    message: 'Đã xảy ra lỗi trong quá trình cập nhật phân công dự án.',
  },
  REMOVE_PROJECT_ASSIGNMENT_ERROR: {
    errorCode: 1,
    errorType: ERROR_TYPES.INTERNAL_SERVER_ERROR,
    message: 'Đã xảy ra lỗi trong quá trình xóa phân công dự án.',
  },
};

module.exports = { PROJECT_ASSIGNMENT_RESPONSES };
