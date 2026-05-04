const { ERROR_TYPES } = require('./apiError');

const DIRECT_COST_DETAIL_RESPONSES = {
  // Success
  CREATE_SUCCESS: {
    errorCode: 0,
    errorType: 'SUCCESS',
    message: 'Tạo chi tiết chi phí trực tiếp thành công.',
  },
  READ_SUCCESS: {
    errorCode: 0,
    errorType: 'SUCCESS',
    message: 'Lấy thông tin chi tiết chi phí trực tiếp thành công.',
  },
  UPDATE_SUCCESS: {
    errorCode: 0,
    errorType: 'SUCCESS',
    message: 'Cập nhật chi tiết chi phí trực tiếp thành công.',
  },
  DELETE_SUCCESS: {
    errorCode: 0,
    errorType: 'SUCCESS',
    message: 'Xóa chi tiết chi phí trực tiếp thành công.',
  },

  // Errors
  DIRECT_COST_DETAIL_CONFLICT: {
    errorCode: 1,
    errorType: ERROR_TYPES.CONFLICT,
    message: 'Chi tiết chi phí trực tiếp đã tồn tại trong hệ thống.',
  },
  DIRECT_COST_DETAIL_NOT_FOUND: {
    errorCode: 1,
    errorType: ERROR_TYPES.NOT_FOUND,
    message: 'Không tìm thấy thông tin chi tiết chi phí trực tiếp.',
  },

  // Internal Server Errors
  CREATE_ERROR: {
    errorCode: 1,
    errorType: ERROR_TYPES.INTERNAL_SERVER_ERROR,
    message: 'Đã xảy ra lỗi trong quá trình tạo chi tiết chi phí trực tiếp.',
  },
  READ_ERROR: {
    errorCode: 1,
    errorType: ERROR_TYPES.INTERNAL_SERVER_ERROR,
    message: 'Đã xảy ra lỗi trong quá trình truy xuất thông tin chi tiết chi phí trực tiếp.',
  },
  UPDATE_ERROR: {
    errorCode: 1,
    errorType: ERROR_TYPES.INTERNAL_SERVER_ERROR,
    message: 'Đã xảy ra lỗi trong quá trình cập nhật thông tin chi tiết chi phí trực tiếp.',
  },
  DELETE_ERROR: {
    errorCode: 1,
    errorType: ERROR_TYPES.INTERNAL_SERVER_ERROR,
    message: 'Đã xảy ra lỗi trong quá trình xóa chi tiết chi phí trực tiếp.',
  },
};

module.exports = { DIRECT_COST_DETAIL_RESPONSES };
