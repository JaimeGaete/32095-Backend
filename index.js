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

    socket.emit('productos', await _productos.getAll());

    socket.on('new-message', data => {
        messages.push(data);
        io.sockets.emit('messages', messages);
        
        (async () => {
            _mensajes.add(messages)
        }
        )();
    });

});

const PORT = process.env.PORT || 8080
const connectedServer = httpServer.listen(PORT, ()=> { console.log("Servidor http con web sockets listo") })
connectedServer.on("error", error => console.log)



