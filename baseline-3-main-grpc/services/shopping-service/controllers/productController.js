'use strict';
const handleError = require('../utils/HandleError');
const service = require('../services/productService');
const { HTTP_STATUS } = require('../constants/httpStatus');
const { ERROR_TYPES } = require('../constants/apiError');
const controller = {};

controller.getProducts = async (req, res) => {
    try {

        const response = await service.getProducts();

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

controller.getProductById = async (req, res) => {
    try {

        const { id } = req.params;
        const response = await service.getProductById(id);

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