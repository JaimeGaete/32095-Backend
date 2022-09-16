const { Router } = require('express')
const productosRouter = Router()

const Productos = require('../api/productos.js')
const _productos = new Productos()

// Crear
productosRouter.post('/', async (req, res, next) => {
    try {
        const data = req.body
        _productos.addPrd(data)
        
        io.sockets.emit('productos', await _productos.getAll());
        res.send("/")
    }
    catch (err) {
        next(err)
    }
})

module.exports = productosRouter 

