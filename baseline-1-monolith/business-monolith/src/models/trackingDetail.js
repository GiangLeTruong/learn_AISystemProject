'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class TrackingDetail extends Model {
        static associate(models) {
            TrackingDetail.belongsTo(models.Order, { foreignKey: 'orderNo', as: 'order' });
        }
    }
    TrackingDetail.init({
        status: { type: DataTypes.STRING, allowNull: false },
    }, {
        sequelize,
        underscored: true,
        modelName: 'TrackingDetail',
        tableName: 'tracking_details',
    });
    return TrackingDetail;
};