const express = require("express")
const app = express()

const { Server: HttpServer } = require("http")
const { Server: IOServer } = require("socket.io")
const { engine  } = require('express-handlebars')
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

const errores = require('./functions/error')

// apis
const Productos = require('./api/productos.js')
const _productos = new Productos()
const Mensajes = require('./api/mensajes.js')
const _mensajes = new Mensajes()

// chats
const messages = []

// handlebars 
app.engine( "hbs", engine ({ extname: ".hbs" }));
app.set("view engine", "hbs");
app.set("views", "./plantillas");

// app.use
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

// post
app.post('/productos', async (req, res, next) => {
    try {
        const data = req.body
        await _productos.addPrd(data)
        io.sockets.emit('productos', await _productos.getAll());
        res.redirect('/')
    }
    catch (err) {
        next(err)
    }
})

// errores
app.use(errores.errorLogger)
app.use(errores.errorResponder)
app.use(errores.invalidPathHandler)

//socket
io.on('connection', async socket => {
    console.log('Un cliente se ha conectado');

    // presento en pantalla los datos almacenados en tabla de productos
    socket.emit('productos', await _productos.getAll());

    // al agregar un nuevo mensaje
    socket.on('new-message', async data => {
        messages.push(data);
        (async () => { await _mensajes.add(messages) } )();
        io.sockets.emit('messages', messages);
    });
});

const PORT = process.env.PORT || 8080
const connectedServer = httpServer.listen(PORT, ()=> { console.log("Servidor http con web sockets listo") })
connectedServer.on("error", error => console.log)
