
const nowdate = require('../functions/nowdate')

let prod, newProd, index

class Productos {
    constructor() {
        this.productos = []
        this.id = 0
        this.timestamp = nowdate.getDateTime()
    }

    listar(id) {
        prod = this.productos.find( prod => prod.id == id )
        return prod || { error: 'producto no encontrado' }
    }

    listarAll() {
        return [...this.productos]
    }

    guardar(prod) {
        newProd = { ...prod, id: ++this.id, timestamp : nowdate.getDateTime() }
        this.productos.push(newProd)
        return { info: 'Producto agregado' }
    }

    actualizar(id, prod) {
        newProd = { ...prod, id: Number(id), timestamp : nowdate.getDateTime() }
        index = this.productos.findIndex( p => p.id == id )
        if (index !== -1) {
            this.productos[index] = newProd
            return { info: 'Producto actualizado' }
        } else {
            return { error: 'Producto no encontrado' }
        }
    }

    borrar(id) {
        index = this.productos.findIndex( prod => prod.id == id )
        if (index !== -1) {
            return this.productos.splice(index, 1)
        } else {
            return { error: 'producto no encontrado' }
        }
    }
}

module.exports = Productos

