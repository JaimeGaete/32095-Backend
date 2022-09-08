const { Router } = require('express')
const router = Router()

const auth = require('../functions/auth')
const cfg = require('../config/configuration')
const file = require('../functions/files')

const Productos = require('../apis/productos')
const _productosAPI = new Productos()

let id, data, result

// Guardar
router.post('/', auth.authorization, (req, res, next) => {
    try {
        data = req.body
        
        // recorro la data en caso de que incluya más de un producto
        for (let i=0;i < data.length; i++) {
            result = _productosAPI.guardar(data[i])
            // almaceno en archivo el producto
            file.add(cfg.configuration.FILEPRODUCTOS, JSON.stringify(data[i])); 
        }
        res.send(result)
    }
    catch (err) {
        next(err)
    }
})

// Listar por id
router.get('/:id', (req, res) => {
    id = req.params.id
    result =  (_productosAPI.listar(id))
    res.send(result)
});

// Listar
router.get('/', (req, res) => {
    result = _productosAPI.listarAll()
    res.send(result)
});

// Actualizar
router.put('/:id', auth.authorization, (req, res, next) => {

    try {
        id = req.params.id
        data = req.body
        
        result = _productosAPI.actualizar(id, data)
        
    /**** TODO ****/
        //let arr = _productosAPI.listarAll()
        //file.upd(cfg.configuration.FILEPRODUCTOS, arr); 

        res.send(result)
    }
    catch (err) {
        next(err)
    }
});

// Borrar
router.delete('/:id', auth.authorization, (req, res) => {
    id = req.params.id
    result = _productosAPI.borrar(id)

    /**** TODO ****/
        //let arr = _productosAPI.listarAll()
        //file.upd(cfg.configuration.FILEPRODUCTOS, arr); 

    res.send(result)
});

module.exports = router

