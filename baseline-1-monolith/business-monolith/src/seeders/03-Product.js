'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        const items = [
            { id: 1, category_id: 1, name: 'Laptop Dell XPS', price: 25000000, description: 'Máy tính cao cấp' },
            { id: 2, category_id: 1, name: 'iPhone 15', price: 22000000, description: 'Điện thoại thông minh' },
            { id: 3, category_id: 2, name: 'Nồi cơm điện Sharp', price: 1500000, description: 'Dung tích 1.8L' }
        ];
        items.forEach(item => {
            item.created_at = Sequelize.literal('NOW()');
            item.updated_at = Sequelize.literal('NOW()');
        });
        await queryInterface.bulkInsert('products', items, {});
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('products', null, {});
    }
};