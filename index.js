import express from 'express'
const { Router } = express
const app = express()

import { errorLogger, errorResponder, invalidPathHandler } from './functions/error.js'
import { authorization } from './functions/auth.js'
import { productoDao, carritoDao } from './daos/indexDaos.js'

// router Productos
const productosRouter = new Router()

productosRouter.post('/', authorization, async (req, res, next) => {
    try {
        const data = req.body   
        let result = ""
        for (const element of data) {
            result = await productoDao.crear(element)
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
    const result =  await productoDao.listarPorId(id)
    res.send(result)
});

// Listar
productosRouter.get('/', async (req, res) => {
    const result = await productoDao.listarTodos()
    res.send(result)
    });

// Actualizar
productosRouter.put('/:id', authorization, async (req, res, next) => {
    try {
        const id = req.params.id
        const data = req.body
        const result = await productoDao.actualizar(id, data)
        res.send(result)
    }
    catch (err) {
        next(err)
    }
});

// Borrar
productosRouter.delete('/:id', authorization, async (req, res) => {
    const id = req.params.id
    const result = await productoDao.borrar(id)
    res.send(result)
    });


// router Carrito

const carritoRouter = new Router()

// Crear
carritoRouter.post('/', async (req, res) => {
    const data = req.body
    const result = await carritoDao.crear(data)
    res.send("" + result)
})

// Agregar producto
carritoRouter.post('/:id/productos', async (req, res) => {
    const id = req.params.id
    const productos = req.body
    const result = await carritoDao.agregarProductoCarro(id, productos)
    res.send(result)
})

// Listar todos
carritoRouter.get('/', async (req, res) => {
    const result = await carritoDao.listarTodos()
    res.send(result)
});

// Listar por id
carritoRouter.get('/:id/productos', async (req, res) => {
    const id = req.params.id
    const result = await carritoDao.listarPorId(id)
    res.send(result)
});

// Borrar carro
carritoRouter.delete('/:id', async(req, res) => {
    const id = req.params.id
    const result = await carritoDao.borrar(id)
    res.send(result)
});

// Borrar producto el carro
carritoRouter.delete('/:id/productos/:id_prod', async (req, res) => {
    const id = req.params.id
    const id_prod = req.params.id_prod
    const result = await carritoDao.borrarProducto(id, id_prod)
    res.send(result)
});

// app.use
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api/productos', productosRouter)
app.use('/api/carrito', carritoRouter)

app.use(errorLogger)
app.use(errorResponder)
app.use(invalidPathHandler)

export default app
