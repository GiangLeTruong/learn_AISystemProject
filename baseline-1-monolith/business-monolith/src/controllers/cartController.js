'use strict';
const handleError = require('../utils/HandleError');
const service = require('../services/cartService');
const { HTTP_STATUS } = require('../constants/httpStatus');
const { ERROR_TYPES } = require('../constants/apiError');
const controller = {};

controller.getCarts = async (req, res) => {
    try {
        const userId = req.user.id;
        const response = await service.getCarts(userId);

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

controller.addToCart = async (req, res) => {
    try {

        const userId = req.user.id;
        const { productId } = req.body;
        const response = await service.addToCart(userId, productId);

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

controller.removeFromCart = async (req, res) => {
    try {

        const userId = req.user.id;
        const { productId } = req.body;
        const response = await service.removeFromCart(userId, productId);

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

controller.clearCart = async (req, res) => {
    try {

        const userId = req.user.id;
        const response = await service.clearCart(userId);

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

controller.checkoutCart = async (req, res) => {
    try {

        const userId = req.user.id;
        const response = await service.checkoutCart(userId);

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

controller.recommenderTrainCart = async (req, res) => {
    try {

        const response = await service.recommenderTrainCart();

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

controller.recommenderPredictCart = async (req, res) => {
    try {

        const userId = req.user.id;
        const response = await service.recommenderPredictCart(userId);

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