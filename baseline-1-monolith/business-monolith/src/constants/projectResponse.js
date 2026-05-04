const { ERROR_TYPES } = require('./apiError');

const COMPANY_IN_CHARGE = {
  T1: 'Đội_1_HCM',
  T2: 'Đội_2_HCM',
  T3: 'Đội_3_BD',
  T4: 'Đội_4_BRVT',
};

const PROJECT_TYPES = {
  MAINTENANCE: 'Bảo trì',
  BUILD: 'Xây dựng',
  FACILITY: 'Hạ tầng',
  EQUP: 'Lắp đặt',
  OTHER: 'Khác',
};

const PROJECT_STATUS = {
  PENDING_FOR_QUOTATION: 'Chờ tạo báo giá',
  PENDING_FOR_SUBMISSION: 'Chờ gửi báo giá',
  PENDING_FOR_APPROVAL: 'Chờ duyệt',
  IMPLEMENTATION: 'Đang triển khai',
  PAUSED: 'Tạm dừng',
  PENDING_FOR_PAYMENT: 'Chờ thanh toán',
  COMPLETED: 'Hoàn tất',
};

const PROJECT_RESPONSES = {
  // Success
  CREATE_SUCCESS: { errorCode: 0, errorType: 'SUCCESS', message: 'Tạo dự án thành công.' },
  READ_SUCCESS: { errorCode: 0, errorType: 'SUCCESS', message: 'Lấy thông tin dự án thành công.' },
  UPDATE_SUCCESS: { errorCode: 0, errorType: 'SUCCESS', message: 'Cập nhật dự án thành công.' },
  DELETE_SUCCESS: { errorCode: 0, errorType: 'SUCCESS', message: 'Xóa dự án thành công.' },

  // Errors
  PROJECT_CONFLICT: {
    errorCode: 1,
    errorType: ERROR_TYPES.CONFLICT,
    message: 'Dự án đã tồn tại trong hệ thống.',
  },
  PROJECT_NUMBER_CONFLICT: {
    errorCode: 1,
    errorType: ERROR_TYPES.CONFLICT,
    message: 'Mã Dự án đã tồn tại trong hệ thống.',
  },
  PROJECT_NOT_FOUND: {
    errorCode: 1,
    errorType: ERROR_TYPES.NOT_FOUND,
    message: 'Không tìm thấy thông tin Dự án.',
  },
  INVALID_PROJECT_STATUS: {
    errorCode: 1,
    errorType: ERROR_TYPES.BAD_REQUEST,
    message: 'Tình trạng dự án không hợp lệ.',
  },

  // Internal Server Errors
  CREATE_ERROR: {
    errorCode: 1,
    errorType: ERROR_TYPES.INTERNAL_SERVER_ERROR,
    message: 'Đã xảy ra lỗi trong quá trình tạo Dự án.',
  },
  READ_ERROR: {
    errorCode: 1,
    errorType: ERROR_TYPES.INTERNAL_SERVER_ERROR,
    message: 'Đã xảy ra lỗi trong quá trình truy xuất thông tin Dự án.',
  },
  UPDATE_ERROR: {
    errorCode: 1,
    errorType: ERROR_TYPES.INTERNAL_SERVER_ERROR,
    message: 'Đã xảy ra lỗi trong quá trình cập nhật thông tin Dự án.',
  },
  DELETE_ERROR: {
    errorCode: 1,
    errorType: ERROR_TYPES.INTERNAL_SERVER_ERROR,
    message: 'Đã xảy ra lỗi trong quá trình xóa Dự án.',
  },
};

module.exports = { PROJECT_RESPONSES, COMPANY_IN_CHARGE, PROJECT_TYPES, PROJECT_STATUS };
