'use strict';
const bcrypt = require('bcrypt');

module.exports = {
    async up(queryInterface, Sequelize) {
        const hashedPassword = await bcrypt.hash('123456', 5);
        const items = [
            { id: 1, name: 'Admin ERP', email: 'admin@erp.com' },
            { id: 2, name: 'Giang Truong', email: 'giang@example.com' },
            { id: 3, name: 'Ha Nguyen', email: 'ha@example.com' },
            { id: 4, name: 'Nam Tran', email: 'nam@example.com' },
            { id: 5, name: 'Trung Le', email: 'trung@example.com' }
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