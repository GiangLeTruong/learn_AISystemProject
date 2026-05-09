const { ERROR_TYPES } = require('./apiError');

const RESPONSES = {
  //STATUS:
  ODER_STATUS: {
    CONFIRMED: 'Đã xác nhận đơn hàng. Chờ thanh toán.',
    PAID_ERROR: 'Thanh toán đơn hàng thất bại.',
    PAID: 'Đã thanh toán đơn hàng thành công.'
  },
  // CART
  SUCCESS: {
    errorCode: 0,
    errorType: 'SUCCESS',
    message: 'Thao tác thành công.',
  },

  GET_CARTS_SUCCESS: {
    errorCode: 0,
    errorType: 'SUCCESS',
    message: 'Lấy danh sách giỏ hàng thành công.',
  },
  GET_ORDERS_SUCCESS: {
    errorCode: 0,
    errorType: 'SUCCESS',
    message: 'Lấy danh sách hóa đơn thành công.',
  },
  ADD_CART_SUCCESS: {
    errorCode: 0,
    errorType: 'SUCCESS',
    message: 'Thêm vào giỏ hàng thành công.',
  },


  // Errors
  USER_CONFLICT: {
    errorCode: 1,
    errorType: ERROR_TYPES.CONFLICT,
    message: 'Cá nhân đã tồn tại trong hệ thống.',
  },
  USER_NOT_FOUND: {
    errorCode: 1,
    errorType: ERROR_TYPES.NOT_FOUND,
    message: 'Không tìm thấy thông tin người dùng.',
  },

  // Internal Server Errors
  ERROR: {
    errorCode: 1,
    errorType: ERROR_TYPES.INTERNAL_SERVER_ERROR,
    message: 'Đã xảy ra lỗi trong quá trình thao tác.',
  },

  GET_CARTS_ERROR: {
    errorCode: 1,
    errorType: ERROR_TYPES.INTERNAL_SERVER_ERROR,
    message: 'Đã xảy ra lỗi trong quá trình lấy danh sách giỏ hàng.',
  },
};

module.exports = { RESPONSES };
