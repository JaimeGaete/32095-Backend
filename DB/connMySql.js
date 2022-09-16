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

// Creación de la tabla productos
connmysql.schema.createTableIfNotExists('productos', function(table) {
  table.string('title');
  table.string('price');
  table.string('thumbnail');
})
.then(console.log);


module.exports = connmysql

