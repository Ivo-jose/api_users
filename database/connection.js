let knex = require('knex')({
    client: 'mysql2',
    connection: {
        host: '127.0.0.1',
        user: 'root',
        password: 'karina3_gioVanna*36',
        database: 'db_management_users'
    }
});

//Export
module.exports = knex;