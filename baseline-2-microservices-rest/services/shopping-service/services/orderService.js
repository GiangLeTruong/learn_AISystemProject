'use strict';
// const models = require('../models');
const { Order, TrackingDetail, Product, Payment, sequelize } = require('../models');
require('dotenv').config();
const { RESPONSES } = require('../constants/allTaskResponse');
const { Op } = require('sequelize');
const service = {};

service.getOrders = async (userId) => {
    try {
        const orders = await Order.findAll({
            where: { userId },
            include: [{
                model: Product,
                as: 'products',
                attributes: ['id', 'name', 'price']
            },
            {
                model: TrackingDetail,
                as: 'trackingDetails',
                attributes: ['id', 'status']
            }
            ]
        });
        return {
            error: RESPONSES.GET_ORDERS_SUCCESS.errorCode,
            errorType: RESPONSES.GET_ORDERS_SUCCESS.errorType,
            message: RESPONSES.GET_ORDERS_SUCCESS.message,
            resData: {
                orders,
            },
        };
    } catch (error) {
        console.error('Error in service.getOrders:', error);
        return {
            error: RESPONSES.ERROR.errorCode,
            errorType: RESPONSES.ERROR.errorType,
            message: RESPONSES.ERROR.message,
        };
    }
};

service.cancelOrder = async (userId, orderId) => {
    const t = await sequelize.transaction();
    try {
        const order = await Order.findOne({
            where: { id: orderId, userId: userId },
            include: [
                {
                    model: TrackingDetail,
                    as: 'trackingDetails',
                    attributes: ['id', 'status']
                }
            ]
        });
        if (!order) {
            return {
                error: RESPONSES.ERROR.errorCode,
                errorType: RESPONSES.ERROR.errorType,
                message: 'Không tìm thấy đơn hàng',
            };
        }
        if (order.trackingDetails.status === RESPONSES.ODER_STATUS.PAID) {
            return {
                error: RESPONSES.ERROR.errorCode,
                errorType: RESPONSES.ERROR.errorType,
                message: 'Không thể hủy đơn hàng đã thanh toán',
            };
        }
        await TrackingDetail.destroy({
            where: { orderNo: orderId },
            transaction: t
        });
        await order.destroy({ transaction: t });
        await t.commit();


        return {
            error: RESPONSES.SUCCESS.errorCode,
            errorType: RESPONSES.SUCCESS.errorType,
            message: RESPONSES.SUCCESS.message,
        };
    } catch (error) {
        await t.rollback();
        console.error('Error in service.cancelOrder:', error);
        return {
            error: RESPONSES.ERROR.errorCode,
            errorType: RESPONSES.ERROR.errorType,
            message: RESPONSES.ERROR.message,
        };
    }
};

service.processOrderPayment = async (userId, orderId, method) => {
    const t = await sequelize.transaction();
    try {
        const order = await Order.findOne({
            where: { id: orderId, userId: userId }
        });

        if (!order) return {
            error: RESPONSES.ERROR.errorCode,
            errorType: RESPONSES.ERROR.errorType,
            message: "Không tìm thấy thông tin đơn hàng",
        }
        const isSuccess = true

        if (isSuccess) {
            await Payment.create({
                userId: userId,
                orderId: orderId,
                method: method || 'Credit Card',
                amount: order.orderAmount
            }, { transaction: t });

            await TrackingDetail.create({
                orderNo: orderId,
                status: RESPONSES.ODER_STATUS.PAID
            }, { transaction: t });
            await t.commit();
            return {
                error: RESPONSES.SUCCESS.errorCode,
                errorType: RESPONSES.SUCCESS.errorType,
                message: 'Thanh toán thành công, hệ thống đã ghi nhận doanh thu.',
            };
        } else {
            await TrackingDetail.create({
                orderNo: orderId,
                status: RESPONSES.ODER_STATUS.PAID_ERROR
            }, { transaction: t });
            await t.commit();
            return {
                error: RESPONSES.ERROR.errorCode,
                errorType: RESPONSES.ERROR.errorType,
                message: 'Thanh toán không thành công. Đã cập nhật trạng thái theo dõi.',
            };
        }


    } catch (error) {
        console.error('Error in service.processOrderPayment:', error);
        return {
            error: RESPONSES.ERROR.errorCode,
            errorType: RESPONSES.ERROR.errorType,
            message: RESPONSES.ERROR.message,
        };
    }
};
module.exports = service;