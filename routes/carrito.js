const { Router } = require('express')

const router = Router()
const Carrito = require('../apis/carrito')
const _carrito = new Carrito()

const cfg = require('../config/configuration')
const file = require('../functions/files')

let id, data, result, id_prod

// Crear
router.post('/', (req, res) => {
    result = _carrito.crear()
    res.send("" + result)
})

// Agregar producto
router.post('/:id/productos', (req, res) => {
    id = req.params.id
    data = req.body
    result = _carrito.agregar(id, data)

    // almaceno el producto en archivo
    file.add(cfg.configuration.FILECARRITO, JSON.stringify(result));

    res.send(result)
})

// Listar todos
router.get('/', (req, res) => {
    result = _carrito.listarAll()
    res.send(result)
});

// Listar por id
router.get('/:id/productos', (req, res) => {
    id = req.params.id
    result = _carrito.listarById(id)
    res.send(result)
});

// Borrar
router.delete('/:id', (req, res) => {
    id = req.params.id
    result = _carrito.borrar(req.params.id)

    /**** TODO ****/
    //let arr = _productosAPI.listarAll()
    //file.upd(cfg.configuration.FILEPRODUCTOS, arr); 

    res.send(result)
});

// Borrar producto
router.delete('/:id/productos/:id_prod', (req, res) => {
    id = req.params.id
    id_prod = req.params.id_prod
    result = _carrito.borrarProducto(id, id_prod)
    
    /**** TODO ****/
    //let arr = _productosAPI.listarAll()
    //file.upd(cfg.configuration.FILEPRODUCTOS, arr); 

    res.send(result)
});

module.exports = router