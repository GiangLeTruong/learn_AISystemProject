const { ERROR_TYPES } = require('./apiError');

const QUOTATION_SUBMIT_TYPE = {
  SUBMIT_1: 'submit_1',
  SUBMIT_2: 'submit_2',
};

const QUOTATION_APPROVE_TYPE = {
  APPROVE_1: 'approve_1',
  APPROVE_2: 'approve_2',
};

const QUOTATION_DECLINE_TYPE = {
  DECLINE_1: 'decline_1',
  DECLINE_2: 'decline_2',
};

const QUOTATION_STATUS = {
  NOT_SUBMITTED_INTERNAL: 'Chưa trình Nội bộ',

  PENDING_INTERNAL_APPROVAL: 'Chờ Nội bộ phê duyệt',
  PENDING_OWNER_APPROVAL: 'Chờ Chủ Đầu Tư phê duyệt',

  INTERNAL_APPROVED: 'Nội bộ đã duyệt',
  OWNER_APPROVED: 'Chủ Đầu Tư đã duyệt',

  INTERNAL_DECLINED: 'Nội bộ không duyệt',
  OWNER_DECLINED: 'Chủ Đầu Tư không duyệt',
};

const QUOTATION_RESPONSES = {
  // Success
  CREATE_SUCCESS: { errorCode: 0, errorType: 'SUCCESS', message: 'Tạo báo giá thành công.' },
  READ_SUCCESS: {
    errorCode: 0,
    errorType: 'SUCCESS',
    message: 'Lấy thông tin báo giá thành công.',
  },
  UPDATE_SUCCESS: { errorCode: 0, errorType: 'SUCCESS', message: 'Cập nhật báo giá thành công.' },
  DELETE_SUCCESS: { errorCode: 0, errorType: 'SUCCESS', message: 'Xóa báo giá thành công.' },

  // Errors
  QUOTATION_CONFLICT: {
    errorCode: 1,
    errorType: ERROR_TYPES.CONFLICT,
    message: 'Báo giá đã tồn tại trong hệ thống.',
  },
  QUOTATION_NUMBER_CONFLICT: {
    errorCode: 1,
    errorType: ERROR_TYPES.CONFLICT,
    message: 'Số Báo giá đã tồn tại trong hệ thống.',
  },
  QUOTATION_NOT_FOUND: {
    errorCode: 1,
    errorType: ERROR_TYPES.NOT_FOUND,
    message: 'Không tìm thấy thông tin Báo giá.',
  },

  // Internal Server Errors
  CREATE_ERROR: {
    errorCode: 1,
    errorType: ERROR_TYPES.INTERNAL_SERVER_ERROR,
    message: 'Đã xảy ra lỗi trong quá trình tạo Báo giá.',
  },
  READ_ERROR: {
    errorCode: 1,
    errorType: ERROR_TYPES.INTERNAL_SERVER_ERROR,
    message: 'Đã xảy ra lỗi trong quá trình truy xuất thông tin Báo giá.',
  },
  UPDATE_ERROR: {
    errorCode: 1,
    errorType: ERROR_TYPES.INTERNAL_SERVER_ERROR,
    message: 'Đã xảy ra lỗi trong quá trình cập nhật thông tin Báo giá.',
  },
  DELETE_ERROR: {
    errorCode: 1,
    errorType: ERROR_TYPES.INTERNAL_SERVER_ERROR,
    message: 'Đã xảy ra lỗi trong quá trình xóa Báo giá.',
  },
};

module.exports = {
  QUOTATION_SUBMIT_TYPE,
  QUOTATION_APPROVE_TYPE,
  QUOTATION_DECLINE_TYPE,
  QUOTATION_STATUS,
  QUOTATION_RESPONSES,
};
