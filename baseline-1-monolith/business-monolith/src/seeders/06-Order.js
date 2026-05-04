'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        const items = [
            { id: 1, user_id: 1, order_amount: 25000000, order_date: new Date() },
            { id: 2, user_id: 2, order_amount: 1500000, order_date: new Date() }
        ];
        items.forEach(item => {
            item.created_at = Sequelize.literal('NOW()');
            item.updated_at = Sequelize.literal('NOW()');
        });
        await queryInterface.bulkInsert('orders', items, {});
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('orders', null, {});
    }
};