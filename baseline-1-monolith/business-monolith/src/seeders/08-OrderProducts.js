'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        const items = [
            { order_no: 1, product_id: 1 }, // Đơn 1 mua Laptop
            { order_no: 2, product_id: 3 }  // Đơn 2 mua Nồi cơm
        ];
        items.forEach(item => {
            item.created_at = Sequelize.literal('NOW()');
            item.updated_at = Sequelize.literal('NOW()');
        });
        await queryInterface.bulkInsert('OrderProducts', items, {});
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('OrderProducts', null, {});
    }
};