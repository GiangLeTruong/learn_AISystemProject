'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        const items = [
            { user_id: 1, country: 'Vietnam', state: 'HCMC', city: 'Thu Duc', pin_code: '700000' },
            { user_id: 2, country: 'Vietnam', state: 'Hanoi', city: 'Hoan Kiem', pin_code: '100000' }
        ];
        items.forEach(item => {
            item.created_at = Sequelize.literal('NOW()');
            item.updated_at = Sequelize.literal('NOW()');
        });
        await queryInterface.bulkInsert('addresses', items, {});
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('addresses', null, {});
    }
};