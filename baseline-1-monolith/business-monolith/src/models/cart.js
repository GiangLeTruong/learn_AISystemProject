'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Cart extends Model {
        static associate(models) {
            Cart.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
            Cart.belongsToMany(models.Product, { through: 'CartProducts', foreignKey: 'cartId', as: 'products' });
        }
    }
    Cart.init({
        // Cart thường chỉ cần ID và UserID làm khóa ngoại
    }, {
        sequelize,
        underscored: true,
        modelName: 'Cart',
        tableName: 'carts',
    });
    return Cart;
};