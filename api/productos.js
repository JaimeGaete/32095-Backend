const connmysql = require('../DB/connMySql')

class Productos {
    
    constructor() {
        this.knex = connmysql
        this.tabla = 'productos'
    }

    async getAll() {
        try {
            const productos = await this.knex.from(this.tabla).select('*')
            .then(function (productos) {
               return productos;
            })
            return productos;
        } catch (e) {
            console.error('Error en el select:', e.message);
        }
    }

    async addPrd(prod) {
        const producto = [
            {title: prod.title, price: prod.price, thumbnail: prod.thumbnail}
        ]

        await this.knex(this.tabla).insert(producto)
            .then(() => { console.log("data insertada"); return true })
            .catch((e) => {
                console.error('Error en el select:', e.message);
            })  
    }
}

module.exports = Productos
