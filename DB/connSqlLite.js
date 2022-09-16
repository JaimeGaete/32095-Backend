const Knex = require('knex');
const path = require("path")

const connsqlite = Knex({
  client: 'sqlite3',
  connection: { filename: path.join(__dirname, './ecommerce.sqlite' )},
  useNullAsDefault: true
});

// Creación de la tabla mensajes
connsqlite.schema.createTableIfNotExists('mensajes', function(table) {
  table.increments();
  table.string('email');
  table.string('fechahora');
  table.string('texto');
})
.then(console.log);


module.exports = connsqlite
