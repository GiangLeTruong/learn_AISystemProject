'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Address extends Model {
        static associate(models) {
            Address.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
        }
    }
    Address.init({
        country: DataTypes.STRING,
        state: DataTypes.STRING,
        city: DataTypes.STRING,
        pinCode: DataTypes.STRING,
    }, {
        sequelize,
        underscored: true,
        modelName: 'Address',
        tableName: 'addresses',
    });
    return Address;
};