const { Router } = require('express')
const productosRouter = Router()

const auth = require('../functions/auth')
const cfg = require('../config/configuration')

const Productos = require('../apis/productos')
const _productosAPI = new Productos()

// Guardar
productosRouter.post('/', auth.authorization, async (req, res, next) => {
    try {
        const data = req.body
        let result = ""
        // recorro la data en caso de que incluya más de un producto
        for (const element of data) {
            result = await _productosAPI.crear(element)
        }
        res.send(result)
    }
    catch (err) {
        next(err)
    }
})

// Listar por id
productosRouter.get('/:id', async (req, res) => {
    const id = req.params.id
    const result =  await _productosAPI.listarPorId(id)
    res.send(result)
});

// Listar
productosRouter.get('/', async (req, res) => {
    const result = await _productosAPI.listarTodos()
    res.send(result)
});

// Actualizar
productosRouter.put('/:id', auth.authorization, async (req, res, next) => {

    try {
        const id = req.params.id
        const data = req.body
        const result = await _productosAPI.actualizar(id, data)
        res.send(result)
    }
    catch (err) {
        next(err)
    }
});

// Borrar
productosRouter.delete('/:id', auth.authorization, async (req, res) => {
    const id = req.params.id
    const result = await _productosAPI.borrar(id)
    res.send(result)
});

module.exports = productosRouter

