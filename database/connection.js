let knex = require('knex')({
    client: 'mysql2',
    connection: {
        host: '127.0.0.1',
        user: 'ivo',
        password: 'karina3_gioVanna*36',
        database: 'db_managenent_users'
    }
});

//Export
module.exports = knex;