const { ERROR_TYPES } = require('./apiError');

const SECTION_STATUS = {
  IN_PROGRESS: 'Đang triển khai',
  PAUSED: 'Tạm dừng',
  WAITING_FOR_PAYMENT: 'Chờ thanh toán',
  COMPLETED: 'Hoàn tất',
};

const SECTION_PHASES = {
  SURVEY_AND_QUOTATION: 'Khảo sát & Báo giá',
  INTERNAL_APPROVAL: 'Nội bộ Phê duyệt',
  OWNER_APPROVAL: 'Chủ Đầu Tư Phê duyệt',
  IMPLEMENTATION: 'Triển khai',
  FINALIZATION: 'Quyết toán',
};

const SECTION_RESPONSES = {
  // Success
  CREATE_SUCCESS: { errorCode: 0, errorType: 'SUCCESS', message: 'Tạo Section thành công.' },
  READ_SUCCESS: {
    errorCode: 0,
    errorType: 'SUCCESS',
    message: 'Lấy thông tin Section thành công.',
  },
  UPDATE_SUCCESS: { errorCode: 0, errorType: 'SUCCESS', message: 'Cập nhật Section thành công.' },
  DELETE_SUCCESS: { errorCode: 0, errorType: 'SUCCESS', message: 'Xóa Section thành công.' },

  // Errors
  SECTION_CONFLICT: {
    errorCode: 1,
    errorType: ERROR_TYPES.CONFLICT,
    message: 'Section đã tồn tại trong hệ thống.',
  },
  SECTION_NOT_FOUND: {
    errorCode: 1,
    errorType: ERROR_TYPES.NOT_FOUND,
    message: 'Không tìm thấy thông tin Section.',
  },
  INVALID_SECTION_PHASE: {
    errorCode: 1,
    errorType: ERROR_TYPES.BAD_REQUEST,
    message: 'Giai đoạn Section không hợp lệ.',
  },
  INVALID_SECTION_STATUS: {
    errorCode: 1,
    errorType: ERROR_TYPES.BAD_REQUEST,
    message: 'Tình trạng Section không hợp lệ.',
  },
  PHASE_ALREADY_EXISTS: {
    errorCode: 1,
    errorType: ERROR_TYPES.CONFLICT,
    message: 'Phase đã tồn tại trong dự án.',
  },

  // Internal Server Errors
  CREATE_ERROR: {
    errorCode: 1,
    errorType: ERROR_TYPES.INTERNAL_SERVER_ERROR,
    message: 'Đã xảy ra lỗi trong quá trình tạo Section.',
  },
  READ_ERROR: {
    errorCode: 1,
    errorType: ERROR_TYPES.INTERNAL_SERVER_ERROR,
    message: 'Đã xảy ra lỗi trong quá trình truy xuất thông tin Section.',
  },
  UPDATE_ERROR: {
    errorCode: 1,
    errorType: ERROR_TYPES.INTERNAL_SERVER_ERROR,
    message: 'Đã xảy ra lỗi trong quá trình cập nhật thông tin Section.',
  },
  DELETE_ERROR: {
    errorCode: 1,
    errorType: ERROR_TYPES.INTERNAL_SERVER_ERROR,
    message: 'Đã xảy ra lỗi trong quá trình xóa Section.',
  },
};

module.exports = { SECTION_STATUS, SECTION_PHASES, SECTION_RESPONSES };
