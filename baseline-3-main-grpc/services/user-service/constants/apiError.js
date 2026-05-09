const { HTTP_STATUS } = require('./httpStatus');

const ERROR_TYPES = {
  BAD_REQUEST: 'BAD_REQUEST',
  UNAUTHORIZED: 'UNAUTHORIZED',
  FORBIDDEN: 'FORBIDDEN',
  NOT_FOUND: 'NOT_FOUND',
  CONFLICT: 'CONFLICT',
  INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR',
};

const ERROR_RESPONSES = {
  MISSING_REQUIRED_FIELD: {
    errorCode: 1,
    errorType: ERROR_TYPES.BAD_REQUEST,
    message: 'Thông tin bắt buộc không được để trống.',
  },
};

const API_ERRORS = Object.freeze({
  API_ERROR_000_REQUEST_ERROR: {
    status: HTTP_STATUS.BAD_REQUEST,
    message: 'Lỗi khi gửi thông tin đến máy chủ',
  },
  API_ERROR_000_REQUEST_FORBIDDEN: {
    status: HTTP_STATUS.FORBIDDEN,
    message: 'Tài khoản của bạn không có quyền thực hiện hành động này.',
  },
  API_ERROR_000_INTERNAL_SERVER_ERROR: {
    status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
    message: 'Lỗi khi xử lý dữ liệu ở máy chủ.',
  },
  API_ERROR_001_REQUEST_TOKEN: {
    status: HTTP_STATUS.UNAUTHORIZED,
    message: 'Không tìm thấy token.',
  },
  API_ERROR_002_INVALID_TOKEN: {
    status: HTTP_STATUS.INVALID_TOKEN,
    message: 'Token không hợp lệ.',
  },
  API_ERROR_003_EXPIRED_TOKEN: {
    status: HTTP_STATUS.EXPIRED_TOKEN,
    message: 'Token đã hết hạn.',
  },
});

module.exports = { ERROR_TYPES, ERROR_RESPONSES, API_ERRORS };
