'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        const items = [
            { id: 1, name: 'Điện tử' },
            { id: 2, name: 'Gia dụng' },
            { id: 3, name: 'Văn phòng phẩm' }
        ];
        items.forEach(item => {
            item.created_at = Sequelize.literal('NOW()');
            item.updated_at = Sequelize.literal('NOW()');
        });
        await queryInterface.bulkInsert('categories', items, {});
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('categories', null, {});
    }
};