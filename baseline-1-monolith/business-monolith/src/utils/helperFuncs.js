'use strict';
const bcrypt = require('bcrypt');
const { Op } = require('sequelize');
const models = require('../models');
const { ERROR_RESPONSES } = require('../constants/apiError');
const { PROJECT_STATUS, PROJECT_RESPONSES } = require('../constants/projectResponse');
const { OFFICE_COST_RESPONSES } = require('../constants/officeCostResponse');

require('dotenv').config();
const util = {};

util.hashPassword = async password => {
  const salt = await bcrypt.genSalt(5);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

util.comparePassword = async (password_1, password_2) => {
  return await bcrypt.compare(password_1, password_2);
};

util.cleanEmptyToNull = value => (value === '' ? null : value);

util.checkMissingFields = (payload, requiredFields) => {
  for (const field of requiredFields) {
    if (!payload[field]) {
      return {
        error: ERROR_RESPONSES.MISSING_REQUIRED_FIELD.errorCode,
        errorType: ERROR_RESPONSES.MISSING_REQUIRED_FIELD.errorType,
        message: ERROR_RESPONSES.MISSING_REQUIRED_FIELD.message,
      };
    }
  }
  return null;
};

module.exports = util;
