const express = require("express")
const app = express()

const { Server: HttpServer } = require("http")
const { Server: IOServer } = require("socket.io")
const { engine  } = require('express-handlebars')
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

const productoRouter = require('./routes/productos.route')

const errores = require('./functions/error')
const Productos = require('./api/productos.js')
const _productos = new Productos()
const Mensajes = require('./api/mensajes.js')
const _mensajes = new Mensajes()

// chats
const messages = []

// app.use
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use('/productos', productoRouter)
app.use(errores.errorLogger)
app.use(errores.errorResponder)
app.use(errores.invalidPathHandler)

// handlebars 
app.engine( "hbs", engine ({ extname: ".hbs" }));
app.set("view engine", "hbs");
app.set("views", "./plantillas");

io.on('connection', async socket => {
    console.log('Un cliente se ha conectado');

    // presento en pantalla los datos almacenados en tabla de productos y mensajes
    socket.emit('productos', await _productos.getAll());
    io.sockets.emit('messages', await _mensajes.getAll());

    // al agregar un nuevo mensaje
    socket.on('new-message', async data => {
        messages.push(data);
        (async () => { await _mensajes.add(messages) } )();
        io.sockets.emit('messages', await _mensajes.getAll());
       
    });
});

const PORT = process.env.PORT || 8080
const connectedServer = httpServer.listen(PORT, ()=> { console.log("Servidor http con web sockets listo") })
connectedServer.on("error", error => console.log)
