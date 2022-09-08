
const nowdate = require('../functions/nowdate')

let newItem, index, item

class Carrito {
    constructor() {
        this.id = 0
        this.timestamp = nowdate.getDateTime()
        this.carrito = [] 
    }

    crear() {
        newItem = { id: ++this.id, timestamp : nowdate.getDateTime(), carrito: [] }
        this.carrito.push(newItem)
        return this.id
    }

    agregar(findId, prod) {
        index = this.carrito.findIndex( item => item.id == findId )
        if (index !== -1) {
            this.carrito[index].carrito.push(prod)
            return { info: 'Producto agregado al carrito' }
        } else {
            return { error: 'Carrito no encontrado' }
        }
    }

    listarAll() {
        return [...this.carrito]
    }

    listarById(findId) {
        item = this.carrito.find( item => item.id == findId )
        return item || { error: 'Carrito no encontrado' }
    }

    borrar(findId) {
        index = this.carrito.findIndex( carro => carro.id == findId )
        if (index !== -1) {
            return this.carrito.splice(index, 1)
        } else {
            return { error: 'Carrito no encontrado' }
        }
    }

    borrarProducto(findId, findIdProd) {
        index = this.carrito.findIndex( item => item.id == findId )
        if (index !== -1) {
            this.carrito[index].carrito.splice(index, findIdProd)
            return { info: 'Producto eliminado al carrito' }
        } else {
            return { error: 'Carrito no encontrado' }
        }
    }

}

module.exports = Carrito

