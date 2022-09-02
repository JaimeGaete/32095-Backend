class Productos {
    
    constructor() {
        this.productos = []
        this.id = 0
    }

    getAll() {
        return [...this.productos]
    }

    addPrd(prod) {
        const newProd = { ...prod, id: ++this.id }
        this.productos.push(newProd)
        return newProd
    }

}

module.exports = Productos
