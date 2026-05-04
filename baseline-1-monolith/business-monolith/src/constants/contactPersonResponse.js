const { ERROR_TYPES } = require('./apiError');

const CONTACT_PERSON_RESPONSES = {
  // Success
  CREATE_SUCCESS: { errorCode: 0, errorType: 'SUCCESS', message: 'Tạo người liên hệ thành công.' },
  READ_SUCCESS: {
    errorCode: 0,
    errorType: 'SUCCESS',
    message: 'Lấy thông tin người liên hệ thành công.',
  },
  UPDATE_SUCCESS: {
    errorCode: 0,
    errorType: 'SUCCESS',
    message: 'Cập nhật người liên hệ thành công.',
  },
  DELETE_SUCCESS: { errorCode: 0, errorType: 'SUCCESS', message: 'Xóa người liên hệ thành công.' },

  // Errors
  CONTACT_PERSON_CONFLICT: {
    errorCode: 1,
    errorType: ERROR_TYPES.CONFLICT,
    message: 'Người liên hệ đã tồn tại trong hệ thống.',
  },
  CONTACT_PERSON_NOT_FOUND: {
    errorCode: 1,
    errorType: ERROR_TYPES.NOT_FOUND,
    message: 'Không tìm thấy thông tin người liên hệ.',
  },

  // Internal Server Errors
  CREATE_ERROR: {
    errorCode: 1,
    errorType: ERROR_TYPES.INTERNAL_SERVER_ERROR,
    message: 'Đã xảy ra lỗi trong quá trình tạo người liên hệ.',
  },
  READ_ERROR: {
    errorCode: 1,
    errorType: ERROR_TYPES.INTERNAL_SERVER_ERROR,
    message: 'Đã xảy ra lỗi trong quá trình truy xuất thông tin người liên hệ.',
  },
  UPDATE_ERROR: {
    errorCode: 1,
    errorType: ERROR_TYPES.INTERNAL_SERVER_ERROR,
    message: 'Đã xảy ra lỗi trong quá trình cập nhật thông tin người liên hệ.',
  },
  DELETE_ERROR: {
    errorCode: 1,
    errorType: ERROR_TYPES.INTERNAL_SERVER_ERROR,
    message: 'Đã xảy ra lỗi trong quá trình xóa người liên hệ.',
  },
};

module.exports = { CONTACT_PERSON_RESPONSES };
