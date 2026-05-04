'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        const items = [
            { order_no: 1, status: 'Đang giao hàng' },
            { order_no: 2, status: 'Đã hoàn thành' }
        ];
        items.forEach(item => {
            item.created_at = Sequelize.literal('NOW()');
            item.updated_at = Sequelize.literal('NOW()');
        });
        await queryInterface.bulkInsert('tracking_details', items, {});
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('tracking_details', null, {});
    }
};