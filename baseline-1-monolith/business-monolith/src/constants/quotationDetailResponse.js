const { ERROR_TYPES } = require('./apiError');

const QUOTATION_DETAIL_RESPONSES = {
  // Success
  CREATE_SUCCESS: {
    errorCode: 0,
    errorType: 'SUCCESS',
    message: 'Tạo báo giá chi tiết thành công.',
  },
  READ_SUCCESS: {
    errorCode: 0,
    errorType: 'SUCCESS',
    message: 'Lấy thông tin báo giá chi tiết thành công.',
  },
  UPDATE_SUCCESS: {
    errorCode: 0,
    errorType: 'SUCCESS',
    message: 'Cập nhật báo giá chi tiết thành công.',
  },
  DELETE_SUCCESS: {
    errorCode: 0,
    errorType: 'SUCCESS',
    message: 'Xóa báo giá chi tiết thành công.',
  },

  // Errors
  QUOTATION_DETAIL_CONFLICT: {
    errorCode: 1,
    errorType: ERROR_TYPES.CONFLICT,
    message: 'Báo giá chi tiết đã tồn tại trong hệ thống.',
  },
  QUOTATION_DETAIL_NOT_FOUND: {
    errorCode: 1,
    errorType: ERROR_TYPES.NOT_FOUND,
    message: 'Không tìm thấy thông tin báo giá chi tiết.',
  },

  // Internal Server Errors
  CREATE_ERROR: {
    errorCode: 1,
    errorType: ERROR_TYPES.INTERNAL_SERVER_ERROR,
    message: 'Đã xảy ra lỗi trong quá trình tạo báo giá chi tiết.',
  },
  READ_ERROR: {
    errorCode: 1,
    errorType: ERROR_TYPES.INTERNAL_SERVER_ERROR,
    message: 'Đã xảy ra lỗi trong quá trình truy xuất thông tin báo giá chi tiết.',
  },
  UPDATE_ERROR: {
    errorCode: 1,
    errorType: ERROR_TYPES.INTERNAL_SERVER_ERROR,
    message: 'Đã xảy ra lỗi trong quá trình cập nhật thông tin báo giá chi tiết.',
  },
  DELETE_ERROR: {
    errorCode: 1,
    errorType: ERROR_TYPES.INTERNAL_SERVER_ERROR,
    message: 'Đã xảy ra lỗi trong quá trình xóa báo giá chi tiết.',
  },
};

module.exports = { QUOTATION_DETAIL_RESPONSES };
