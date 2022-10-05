import { promises as fs } from 'fs'

class Carrito {
    constructor() {
        this.fileName = './files/carrito.json'
    }

    /****** Funciones para acceder al archivo  ******/

    // recupera carros del archivo; sino, devuelve un producto vacio
    async listarArchivo() {
        try {
            const carroJson = await readFile(this.fileName, 'utf-8')
            const carrosList = JSON.parse(carroJson)
            return carrosList
        } catch (error) {
            const carroArr = {
                nextId: 1,
                carros: []
            }
            this.agregarCarroArchivo(carroArr)
            return carroArr
        }
    }

    // agrega carros al archivo
    async agregarCarroArchivo(carroArr) {
        try {
            const carro = JSON.stringify(carroArr)
            await writeFile(this.fileName, carro)
            return true
        } catch (error) {
            console.log(error);
            return false
        }
    }

    /****** Funciones de los productos  ******/

    // Recupero todos los carros
    async listarTodos() {
        const { carros } = await this.listarArchivo()
        return carros || { info: 'No existen carros' }
    }

    // Recupero carro por su Id
    async listarPorId(id) {
        const { carros } = await this.listarArchivo()
        const carro = carros.find(item => item.id == id)
        return carro || { carro: 'carro no encontrado' }
    }

    // Crea carro
    async crear() {
        const carroArr = await this.listarArchivo()

        const newCart = {
            id: carroArr.nextId,
            timestamp: Date.now(),
            productos: []
        }
        carroArr.nextId++
        carroArr.carros.push(newCart)
        
        const result = await this.agregarCarroArchivo(carroArr)
        if (result) {
            return newCart.id
        }
        return false
    }

    async agregarProductoCarro(id, productos) {
        const carroArr = await this.listarArchivo()
        const { carros } = carroArr
        const carro = carros.find(item => item.id == id)

         if (carro) {
            carro.productos.push(productos)
            const result = await this.agregarCarroArchivo(carroArr)
            if (result) return { info: 'Producto agregado al carrito' }
        }
        return  { error: 'Ocurrio un error al agregar el producto' }
    }

    // Eliminar carro
    async borrar(id) {
        const carroArr = await this.listarArchivo()
        const { carros } = carroArr
        const index = carros.findIndex(item => item.id == id)

        if (index >= 0) {
            carros.splice(index, 1)
            await this.agregarCarroArchivo(carroArr)
            return { info: 'Carro eliminado' }
        }
        return { error: 'Carro no encontrado' }
    }

    async borrarProducto(id, idProducto) {
        const carroArr = await this.listarArchivo()
        const { carros } = carroArr
        const carro = carros.find(item => item.id == id)

        if (carro) {
            // busco producto dentro del carro
            const indexProd = carro.productos.findIndex(item => item.id == idProducto)

            if (indexProd >= 0) {
                carro.productos.splice(indexProd, 1)
                await this.agregarCarroArchivo(carroArr)
                return { info: 'Producto eliminado' }
            }
        }
        return { error: 'Carro no encontrado' }
    }
}

let carritoDao = new Carrito()

export {carritoDao}