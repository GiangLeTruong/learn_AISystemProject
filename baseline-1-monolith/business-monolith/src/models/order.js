'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Order extends Model {
        static associate(models) {
            Order.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
            Order.hasMany(models.TrackingDetail, { foreignKey: 'orderNo', as: 'trackingDetails' });
            Order.belongsToMany(models.Product, { through: 'OrderProducts', foreignKey: 'orderNo', as: 'products' });
            Order.hasOne(models.Payment, { foreignKey: 'orderId', as: 'payment' });
        }
    }
    Order.init({
        orderAmount: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
        orderDate: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    }, {
        sequelize,
        underscored: true,
        modelName: 'Order',
        tableName: 'orders',
    });
    return Order;
};