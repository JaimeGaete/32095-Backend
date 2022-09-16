const connsqlite = require('../DB/connSqlLite')

class Mensajes {
    
    constructor() {
        this.knex = connsqlite
        this.tabla = 'mensajes'
    }

    async add(msg) {
        await this.knex(this.tabla).insert(msg)
            .then(() => { console.log("data insertada"); return true })
            .catch((e) => {
                console.error('Error al insertar:', e.message);
            })  
    }
}

module.exports = Mensajes
