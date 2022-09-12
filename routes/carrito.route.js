const { Router } = require('express')
const carritoRouter = Router()

const Carrito = require('../apis/carrito')
const _carritoAPI = new Carrito()

// Crear
carritoRouter.post('/', async (req, res) => {
    const data = req.body
    const result = await _carritoAPI.crear(data)
    res.send("" + result)
})

// Agregar producto
carritoRouter.post('/:id/productos', async (req, res) => {
    const id = req.params.id
    const productos = req.body
    const result = await _carritoAPI.agregarProductoCarro(id, productos)
    res.send(result)
})

// Listar todos
carritoRouter.get('/', async (req, res) => {
    const result = await _carritoAPI.listarTodos()
    res.send(result)
});

// Listar por id
carritoRouter.get('/:id/productos', async (req, res) => {
    const id = req.params.id
    const result = await _carritoAPI.listarPorId(id)
    res.send(result)
});

// Borrar carro
carritoRouter.delete('/:id', async(req, res) => {
    const id = req.params.id
    const result = await _carritoAPI.borrar(id)
    res.send(result)
});

// Borrar producto el carro
carritoRouter.delete('/:id/productos/:id_prod', async (req, res) => {
    const id = req.params.id
    const id_prod = req.params.id_prod


    const result = await _carritoAPI.borrarProducto(id, id_prod)
    res.send(result)
});

module.exports = carritoRouter