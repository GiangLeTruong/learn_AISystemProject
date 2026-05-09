'use strict';
// const models = require('../models');
const axios = require('axios');
const { Cart, Product, Order, TrackingDetail, sequelize } = require('../models');
require('dotenv').config();
const { RESPONSES } = require('../constants/allTaskResponse');
const { Op } = require('sequelize');
const service = {};

const AI_RECOMMEND_URL = process.env.AI_RECOMMEND_URL

service.getCarts = async (userId) => {
    try {
        const [cart] = await Cart.findOrCreate({
            where: { userId },
            include: [{
                model: Product,
                as: 'products',
                attributes: ['id', 'name', 'price']
            }]
        });
        return {
            error: RESPONSES.GET_CARTS_SUCCESS.errorCode,
            errorType: RESPONSES.GET_CARTS_SUCCESS.errorType,
            message: RESPONSES.GET_CARTS_SUCCESS.message,
            resData: {
                cart,
            },
        };
    } catch (error) {
        console.error('Error in service.getCarts:', error);
        return {
            error: RESPONSES.GET_CARTS_ERROR.errorCode,
            errorType: RESPONSES.GET_CARTS_ERROR.errorType,
            message: RESPONSES.GET_CARTS_ERROR.message,
        };
    }
};

service.addToCart = async (userId, productId) => {
    try {
        const product = await Product.findByPk(productId);

        if (!product) {
            return {
                error: RESPONSES.ERROR.errorCode,
                errorType: RESPONSES.ERROR.errorType,
                message: "Sản phẩm không tồn tại",
            }
        }

        const [cart] = await Cart.findOrCreate({ where: { userId: userId } });
        await cart.addProduct(product);

        return {
            error: RESPONSES.SUCCESS.errorCode,
            errorType: RESPONSES.SUCCESS.errorType,
            message: RESPONSES.SUCCESS.message,
        };
    } catch (error) {
        console.error('Error in service.addToCart:', error);
        return {
            error: RESPONSES.ERROR.errorCode,
            errorType: RESPONSES.ERROR.errorType,
            message: RESPONSES.ERROR.message,
        };
    }
};

service.removeFromCart = async (userId, productId) => {
    try {
        const cart = await Cart.findOne({ where: { userId: userId } });
        if (!cart) return {
            error: RESPONSES.ERROR.errorCode,
            errorType: RESPONSES.ERROR.errorType,
            message: "Giỏ hàng trống",
        }

        await cart.removeProduct(productId);


        return {
            error: RESPONSES.SUCCESS.errorCode,
            errorType: RESPONSES.SUCCESS.errorType,
            message: RESPONSES.SUCCESS.message,
        };
    } catch (error) {
        console.error('Error in service.removeFromCart:', error);
        return {
            error: RESPONSES.ERROR.errorCode,
            errorType: RESPONSES.ERROR.errorType,
            message: RESPONSES.ERROR.message,
        };
    }
};
service.clearCart = async (userId) => {
    try {
        const cart = await Cart.findOne({ where: { userId: userId } });
        if (cart) {
            await cart.setProducts([]);
        }
        return {
            error: RESPONSES.SUCCESS.errorCode,
            errorType: RESPONSES.SUCCESS.errorType,
            message: RESPONSES.SUCCESS.message,
        };
    } catch (error) {
        console.error('Error in service.clearCart:', error);
        return {
            error: RESPONSES.ERROR.errorCode,
            errorType: RESPONSES.ERROR.errorType,
            message: RESPONSES.ERROR.message,
        };
    }
};
service.checkoutCart = async (userId) => {
    const t = await sequelize.transaction();
    try {
        const cart = await Cart.findOne({
            where: { userId: userId },
            include: [{ model: Product, as: 'products' }]
        });

        if (!cart || !cart.products || cart.products.length === 0) {
            await t.rollback();
            return {
                error: RESPONSES.ERROR.errorCode,
                errorType: RESPONSES.ERROR.errorType,
                message: "Giỏ hàng đang trống, không thể thanh toán",
            }
        }

        // To order
        let totalAmount = 0;
        cart.products.forEach(p => {
            totalAmount += parseFloat(p.price);
        });
        const newOrder = await Order.create({
            userId: userId,
            orderAmount: totalAmount,
            orderDate: new Date()
        }, { transaction: t });
        await TrackingDetail.create({
            orderNo: newOrder.id,
            status: RESPONSES.ODER_STATUS.CONFIRMED
        }, { transaction: t });

        await newOrder.addProducts(cart.products, { transaction: t });
        await cart.setProducts([], { transaction: t });
        await t.commit();

        return {
            error: RESPONSES.SUCCESS.errorCode,
            errorType: RESPONSES.SUCCESS.errorType,
            message: 'Xác nhận đơn hàng thành công, đơn hàng đã được tạo',
        };
    } catch (error) {
        console.error('Error in service.checkoutCart:', error);
        await t.rollback();
        return {
            error: RESPONSES.ERROR.errorCode,
            errorType: RESPONSES.ERROR.errorType,
            message: RESPONSES.ERROR.message,
        };
    }
};


service.recommenderTrainCart = async () => {
    try {
        console.log('--- Bắt đầu thu thập dữ liệu huấn luyện AI ---');
        const orders = await Order.findAll({
            attributes: ['id', 'userId'],
            include: [{
                model: Product,
                as: 'products',
                attributes: ['id'],
                through: { attributes: [] }
            }]
        });
        if (!orders || orders.length === 0) {
            return {
                error: RESPONSES.ERROR.errorCode,
                errorType: RESPONSES.ERROR.errorType,
                message: "Không có dữ liệu đơn hàng nào để huấn luyện.",
            }
        }
        const trainingData = [];
        orders.forEach(order => {
            // Một đơn hàng có thể có nhiều sản phẩm
            order.products.forEach(product => {
                trainingData.push({
                    userId: order.userId,
                    productId: product.id,
                    rating: 5 // Điểm mặc định cho việc "Đã từng thêm vào giỏ hàng và đến trang thanh toán"
                });
            });
        });

        console.log(`Đã thu thập được ${trainingData.length} bản ghi giao dịch. Đang gửi sang Python...`);

        const aiResponse = await axios.post(`${AI_RECOMMEND_URL}/train`, {
            data: trainingData
        });

        return {
            error: RESPONSES.SUCCESS.errorCode,
            errorType: RESPONSES.SUCCESS.errorType,
            message: 'Đã gửi dữ liệu và huấn luyện AI thành công',
            resData: {
                details: aiResponse.data,
                totalRecordsSync: trainingData.length
            },
        };
    } catch (error) {
        console.error('Error in service.recommenderTrainCart:', error);
        await t.rollback();
        return {
            error: RESPONSES.ERROR.errorCode,
            errorType: RESPONSES.ERROR.errorType,
            message: RESPONSES.ERROR.message,
        };
    }
};

service.recommenderPredictCart = async (userId) => {
    try {
        const aiResponse = await axios.post(`${AI_RECOMMEND_URL}/predict`, {
            userId: userId,
            topN: 5
        });

        if (!aiResponse.data.success) {
            return {
                error: RESPONSES.ERROR.errorCode,
                errorType: RESPONSES.ERROR.errorType,
                message: "Xin gợi ý sản phẩm từ AI thất bại.",
            }
        }
        const recommendedProductIds = aiResponse.data.data.recommendedProductIds;

        const recommendedProducts = await Product.findAll({
            where: {
                id: recommendedProductIds
            },
            attributes: ['id', 'name', 'price', 'description']
        });

        return {
            error: RESPONSES.SUCCESS.errorCode,
            errorType: RESPONSES.SUCCESS.errorType,
            message: 'Lấy danh sách sản phẩm gợi ý thành công.',
            resData: {
                recommendedProducts,
            },
        };
    } catch (error) {
        console.error('Error in service.recommenderPredictCart:', error);
        await t.rollback();
        return {
            error: RESPONSES.ERROR.errorCode,
            errorType: RESPONSES.ERROR.errorType,
            message: RESPONSES.ERROR.message,
        };
    }
};
module.exports = service;