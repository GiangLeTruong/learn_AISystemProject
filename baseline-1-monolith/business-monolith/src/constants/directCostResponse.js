const { ERROR_TYPES } = require('./apiError');

const DIRECT_COST_RESPONSES = {
  // Success
  CREATE_SUCCESS: {
    errorCode: 0,
    errorType: 'SUCCESS',
    message: 'Tạo chi phí trực tiếp thành công.',
  },
  READ_SUCCESS: {
    errorCode: 0,
    errorType: 'SUCCESS',
    message: 'Lấy thông tin chi phí trực tiếp thành công.',
  },
  UPDATE_SUCCESS: {
    errorCode: 0,
    errorType: 'SUCCESS',
    message: 'Cập nhật chi phí trực tiếp thành công.',
  },
  DELETE_SUCCESS: {
    errorCode: 0,
    errorType: 'SUCCESS',
    message: 'Xóa chi phí trực tiếp thành công.',
  },

  // Errors
  DIRECT_COST_CONFLICT: {
    errorCode: 1,
    errorType: ERROR_TYPES.CONFLICT,
    message: 'Chi phí trực tiếp đã tồn tại trong hệ thống.',
  },
  DIRECT_COST_NOT_FOUND: {
    errorCode: 1,
    errorType: ERROR_TYPES.NOT_FOUND,
    message: 'Không tìm thấy thông tin chi phí trực tiếp.',
  },

  // Internal Server Errors
  CREATE_ERROR: {
    errorCode: 1,
    errorType: ERROR_TYPES.INTERNAL_SERVER_ERROR,
    message: 'Đã xảy ra lỗi trong quá trình tạo chi phí trực tiếp.',
  },
  READ_ERROR: {
    errorCode: 1,
    errorType: ERROR_TYPES.INTERNAL_SERVER_ERROR,
    message: 'Đã xảy ra lỗi trong quá trình truy xuất thông tin chi phí trực tiếp.',
  },
  UPDATE_ERROR: {
    errorCode: 1,
    errorType: ERROR_TYPES.INTERNAL_SERVER_ERROR,
    message: 'Đã xảy ra lỗi trong quá trình cập nhật thông tin chi phí trực tiếp.',
  },
  DELETE_ERROR: {
    errorCode: 1,
    errorType: ERROR_TYPES.INTERNAL_SERVER_ERROR,
    message: 'Đã xảy ra lỗi trong quá trình xóa chi phí trực tiếp.',
  },
};

module.exports = { DIRECT_COST_RESPONSES };
