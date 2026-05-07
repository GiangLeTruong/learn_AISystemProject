'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Payment extends Model {
        static associate(models) {
            Payment.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
            Payment.belongsTo(models.Order, { foreignKey: 'orderId', as: 'order' });
        }
    }
    Payment.init({
        method: { type: DataTypes.STRING, allowNull: false },
        amount: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    }, {
        sequelize,
        underscored: true,
        modelName: 'Payment',
        tableName: 'payments',
    });
    return Payment;
};