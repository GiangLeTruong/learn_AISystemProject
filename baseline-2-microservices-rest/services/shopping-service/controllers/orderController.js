'use strict';
const handleError = require('../utils/HandleError');
const service = require('../services/orderService');
const { HTTP_STATUS } = require('../constants/httpStatus');
const { ERROR_TYPES } = require('../constants/apiError');
const controller = {};

controller.getOrders = async (req, res) => {
    try {
        const userId = req.user.id;
        const response = await service.getOrders(userId);

        if (response.error === 1 && response.errorType === ERROR_TYPES.UNAUTHORIZED) {
            return res.status(HTTP_STATUS.UNAUTHORIZED).json(response);
        }

        if (response.error === 1 && response.errorType === ERROR_TYPES.FORBIDDEN) {
            return res.status(HTTP_STATUS.FORBIDDEN).json(response);
        }

        if (response.error === 1 && response.errorType === ERROR_TYPES.INTERNAL_SERVER_ERROR) {
            return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(response);
        }
        return res.status(HTTP_STATUS.OK).json(response);
    } catch (error) {
        return handleError.handleServerError(res, error);
    }
};

controller.cancelOrder = async (req, res) => {
    try {

        const userId = req.user.id;
        const { orderId } = req.params;
        const response = await service.cancelOrder(userId, orderId);

        if (response.error === 1 && response.errorType === ERROR_TYPES.UNAUTHORIZED) {
            return res.status(HTTP_STATUS.UNAUTHORIZED).json(response);
        }

        if (response.error === 1 && response.errorType === ERROR_TYPES.FORBIDDEN) {
            return res.status(HTTP_STATUS.FORBIDDEN).json(response);
        }

        if (response.error === 1 && response.errorType === ERROR_TYPES.INTERNAL_SERVER_ERROR) {
            return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(response);
        }
        return res.status(HTTP_STATUS.OK).json(response);
    } catch (error) {
        return handleError.handleServerError(res, error);
    }
};

controller.processOrderPayment = async (req, res) => {
    try {
        const userId = req.user.id;
        const { orderId } = req.params;
        const { method } = req.body;
        const response = await service.processOrderPayment(userId, orderId, method);

        if (response.error === 1 && response.errorType === ERROR_TYPES.UNAUTHORIZED) {
            return res.status(HTTP_STATUS.UNAUTHORIZED).json(response);
        }

        if (response.error === 1 && response.errorType === ERROR_TYPES.FORBIDDEN) {
            return res.status(HTTP_STATUS.FORBIDDEN).json(response);
        }

        if (response.error === 1 && response.errorType === ERROR_TYPES.INTERNAL_SERVER_ERROR) {
            return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(response);
        }
        return res.status(HTTP_STATUS.OK).json(response);
    } catch (error) {
        return handleError.handleServerError(res, error);
    }
};

module.exports = controller;