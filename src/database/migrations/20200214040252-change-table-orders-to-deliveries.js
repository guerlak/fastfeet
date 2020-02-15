module.exports = {
    up: queryInterface => {
        return queryInterface.renameTable('orders', 'deliveries');
    },

    down: queryInterface => {
        return queryInterface.renameTable('deliveries', 'orders');
    }
};
