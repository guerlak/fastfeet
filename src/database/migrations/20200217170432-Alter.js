module.exports = {
    up: queryInterface => {
        return queryInterface.renameColumn('files', 'filename', 'name');
    },

    down: (queryInterface, Sequelize) => { }
};
