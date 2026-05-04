'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        static associate(models) {
            User.hasMany(models.Order, { foreignKey: 'userId', as: 'orders' });
            User.hasMany(models.Address, { foreignKey: 'userId', as: 'addresses' });
            User.hasMany(models.Payment, { foreignKey: 'userId', as: 'payments' });
            User.hasOne(models.Cart, { foreignKey: 'userId', as: 'cart' });
        }
    }
    User.init({
        name: { type: DataTypes.STRING, allowNull: false },
        email: { type: DataTypes.STRING, allowNull: false, unique: true },
        password: { type: DataTypes.STRING, allowNull: false },
    }, {
        sequelize,
        underscored: true,
        modelName: 'User',
        tableName: 'users',
    });
    return User;
};