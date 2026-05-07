'use strict';
// const models = require('../models');
const { Product, sequelize } = require('../models');
require('dotenv').config();
const util = require('../utils/helperFuncs');
const { RESPONSES } = require('../constants/allTaskResponse');
const { Op, where } = require('sequelize');
const service = {};

service.getProducts = async () => {
    try {
        const products = await Product.findAll({
            attributes: ['id', 'name', 'price']
        });
        return {
            error: RESPONSES.GET_ORDERS_SUCCESS.errorCode,
            errorType: RESPONSES.GET_ORDERS_SUCCESS.errorType,
            message: RESPONSES.GET_ORDERS_SUCCESS.message,
            resData: {
                products,
            },
        };
    } catch (error) {
        console.error('Error in service.getProducts:', error);
        return {
            error: RESPONSES.ERROR.errorCode,
            errorType: RESPONSES.ERROR.errorType,
            message: RESPONSES.ERROR.message,
        };
    }
};

service.getProductById = async (id) => {
    try {
        const product = await Product.findAll({
            where: { id },
            attributes: ['id', 'name', 'price', 'description']
        });

        return {
            error: RESPONSES.SUCCESS.errorCode,
            errorType: RESPONSES.SUCCESS.errorType,
            message: RESPONSES.SUCCESS.message,
            resData: {
                product,
            },
        };
    } catch (error) {
        await t.rollback();
        console.error('Error in service.getProductById:', error);
        return {
            error: RESPONSES.ERROR.errorCode,
            errorType: RESPONSES.ERROR.errorType,
            message: RESPONSES.ERROR.message,
        };
    }
};

module.exports = service;