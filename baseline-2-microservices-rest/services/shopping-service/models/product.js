'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Product extends Model {
        static associate(models) {
            Product.belongsTo(models.Category, { foreignKey: 'categoryId', as: 'category' });
            Product.belongsToMany(models.Cart, { through: 'CartProducts', foreignKey: 'productId', as: 'carts' });
            Product.belongsToMany(models.Order, { through: 'OrderProducts', foreignKey: 'productId', as: 'orders' });
        }
    }
    Product.init({
        name: { type: DataTypes.STRING, allowNull: false },
        price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
        description: DataTypes.TEXT,
    }, {
        sequelize,
        underscored: true,
        modelName: 'Product',
        tableName: 'products',
    });
    return Product;
};