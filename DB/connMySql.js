const Knex = require('knex');

const connmysql = Knex({
  client: 'mysql',
  connection: {
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: '',
    database: 'coderhouse'
  },
});



module.exports = connmysql

