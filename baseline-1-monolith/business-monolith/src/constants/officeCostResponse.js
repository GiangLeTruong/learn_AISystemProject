const { ERROR_TYPES } = require('./apiError');

const OFFICE_COST_RESPONSES = {
  // Success
  CREATE_SUCCESS: { errorCode: 0, errorType: 'SUCCESS', message: 'Tạo chi phí văn phòng thành công.' },
  READ_SUCCESS: {
    errorCode: 0,
    errorType: 'SUCCESS',
    message: 'Lấy thông tin chi phí văn phòng thành công.',
  },
  UPDATE_SUCCESS: {
    errorCode: 0,
    errorType: 'SUCCESS',
    message: 'Cập nhật chi phí văn phòng thành công.',
  },
  DELETE_SUCCESS: { errorCode: 0, errorType: 'SUCCESS', message: 'Xóa chi phí văn phòng thành công.' },

  // Errors
  OFFICE_COST_CONFLICT: {
    errorCode: 1,
    errorType: ERROR_TYPES.CONFLICT,
    message: 'Chi phí văn phòng đã tồn tại trong hệ thống.',
  },
  OFFICE_COST_NOT_FOUND: {
    errorCode: 1,
    errorType: ERROR_TYPES.NOT_FOUND,
    message: 'Không tìm thấy thông tin chi phí văn phòng.',
  },
  INVALID_FORMAT: {
    errorCode: 1,
    errorType: ERROR_TYPES.BAD_REQUEST,
    message: 'Định dạng period không hợp lệ. Vui lòng sử dụng định dạng YYYY-MM (ví dụ: 2025-01).',
  },

  // Internal Server Errors
  CREATE_ERROR: {
    errorCode: 1,
    errorType: ERROR_TYPES.INTERNAL_SERVER_ERROR,
    message: 'Đã xảy ra lỗi trong quá trình tạo chi phí văn phòng.',
  },
  READ_ERROR: {
    errorCode: 1,
    errorType: ERROR_TYPES.INTERNAL_SERVER_ERROR,
    message: 'Đã xảy ra lỗi trong quá trình truy xuất thông tin chi phí văn phòng.',
  },
  UPDATE_ERROR: {
    errorCode: 1,
    errorType: ERROR_TYPES.INTERNAL_SERVER_ERROR,
    message: 'Đã xảy ra lỗi trong quá trình cập nhật thông tin chi phí văn phòng.',
  },
  DELETE_ERROR: {
    errorCode: 1,
    errorType: ERROR_TYPES.INTERNAL_SERVER_ERROR,
    message: 'Đã xảy ra lỗi trong quá trình xóa chi phí văn phòng.',
  },
};

module.exports = { OFFICE_COST_RESPONSES };
