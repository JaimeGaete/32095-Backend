const express = require("express")
const { Router } = require("express")
const app = express()

const productosRouter = Router()

const { Server: HttpServer } = require("http")
const { Server: IOServer } = require("socket.io")
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

const Productos = require('../api/productos.js')
const _productos = new Productos()

// Crear
productosRouter.post('/', async (req, res, next) => {
    try {
        const data = req.body
        _productos.addPrd(data)
        
        io.sockets.emit('productos', await _productos.getAll());
        res.redirect('/')
    }
    catch (err) {
        next(err)
    }
})

module.exports = productosRouter 

