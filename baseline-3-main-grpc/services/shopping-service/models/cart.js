'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Cart extends Model {
        static associate(models) {
            Cart.belongsToMany(models.Product, { through: 'CartProducts', foreignKey: 'cartId', as: 'products' });
        }
    }
    Cart.init({
        // Cart thường chỉ cần ID và UserID làm khóa ngoại
        userId: { type: DataTypes.INTEGER, allowNull: false },
    }, {
        sequelize,
        underscored: true,
        modelName: 'Cart',
        tableName: 'carts',
    });
    return Cart;
};