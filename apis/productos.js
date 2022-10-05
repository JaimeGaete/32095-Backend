import { promises as fs } from 'fs'

class Productos {
    constructor() {
        this.fileName = './files/productos.json'
    }

    /****** Funciones para acceder al archivo  ******/

    // recupera productos del archivo; sino, devuelve un producto vacio
    async listarArchivo() {
        try {
            const productosJson = await fs.readFile(this.fileName, 'utf-8')
            const productosList = JSON.parse(productosJson)
            return productosList
        } catch (error) {
           const productosArr = {
                nextId: 1,
                productos: []
            }
            this.agregarProductoArchivo(productosArr)
            return productosArr
        }
    }

    // agrega productos al archivo
    async agregarProductoArchivo(productosArr) {
        try {
            const producto = JSON.stringify(productosArr)
            await fs.writeFile(this.fileName, producto)
            return true
        } catch (error) {
            console.log(error);
            return false
        }
    }

    /****** Funciones de los productos  ******/

    // Recupero todos los productos
    async listarTodos() {
        const { productos } = await this.listarArchivo()
        return productos || { info: 'No existen productos' }
    }

    // Recupero producto por su Id
    async listarPorId(id) {
        const { productos } = await this.listarArchivo()
        const prod = productos.find(item => item.id == id )
        return prod || { info: 'producto no encontrado' }
    }

    // Crear producto
    async crear(item) {
        const productosArr = await this.listarArchivo()
        const id = productosArr.nextId
        productosArr.nextId++
        const timestamp = Date.now()

        const newItem = {
            ...item,
            id,
            timestamp
        }

        productosArr.productos.push(newItem)
        const result = await this.agregarProductoArchivo(productosArr)
        if (result) return { info: 'Producto agregado' }
        return result
    }

    // Actualizar producto
    async actualizar(id, data) {
        const productosArr = await this.listarArchivo()
        const { productos } = productosArr
        
        const producto = productos.find(item => item.id == id)
        if (producto) {
            Object.keys(data).forEach(key => {
                producto[key] = data[key]
            })
        } else { 
            return { error: 'Producto no encontrado' }
        }

        const result = await this.agregarProductoArchivo(productosArr)
        if (result) return { info: 'Producto actualizado' }
        return { error: 'Ocurrio un error al actualizar el producto' }
    }

    // Eliminar producto
    async borrar(id) {
        const productosArr = await this.listarArchivo()
        const { productos } = productosArr
        const index = productos.findIndex(item => item.id == id)

        if (index >= 0) {
            productos.splice(index, 1)
            await this.agregarProductoArchivo(productosArr)
            return { info: 'Producto eliminado' }
        }
        return { error: 'producto no encontrado' }
    }
}

let productoDao = new Productos()

export {productoDao}