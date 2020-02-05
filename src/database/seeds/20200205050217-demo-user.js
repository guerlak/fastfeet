module.exports = {
    up: queryInterface => {
        return queryInterface.bulkInsert('users', [
            {
                name: 'John',
                email: 'example@example.com',
                password_hash: 'needsAhash',
                created_at: new Date(),
                updated_at: new Date()
            }
        ]);
    },
    down: queryInterface => {
        return queryInterface.bulkDelete('Users', null, {});
    }
};
