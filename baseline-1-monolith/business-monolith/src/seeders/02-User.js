'use strict';
const bcrypt = require('bcrypt');

module.exports = {
    async up(queryInterface, Sequelize) {
        const hashedPassword = await bcrypt.hash('123456', 5);
        const items = [
            { id: 1, name: 'Giang Truong', email: 'giang@example.com' },
            { id: 2, name: 'Admin ERP', email: 'admin@erp.com' }
        ];
        items.forEach(item => {
            item.password = hashedPassword; // Thêm để phục vụ login AI sau này
            item.created_at = Sequelize.literal('NOW()');
            item.updated_at = Sequelize.literal('NOW()');
        });
        await queryInterface.bulkInsert('users', items, {});
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('users', null, {});
    }
};