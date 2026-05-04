'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        const items = [
            { id: 1, user_id: 1, method: 'Credit Card', amount: 25000000 },
            { id: 2, user_id: 2, method: 'Momo', amount: 1500000 }
        ];
        items.forEach(item => {
            item.created_at = Sequelize.literal('NOW()');
            item.updated_at = Sequelize.literal('NOW()');
        });
        await queryInterface.bulkInsert('payments', items, {});
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('payments', null, {});
    }
};