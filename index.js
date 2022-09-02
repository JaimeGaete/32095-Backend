const express = require("express")
const { Server: HttpServer } = require("http")
const { Server: IOServer } = require("socket.io")
const { engine  } = require('express-handlebars')

const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

const Productos = require('./api/productos.js')
const _productos = new Productos()
const messages = []

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

// Handlebars 
app.engine( "hbs", engine ({ extname: ".hbs" }));
app.set("view engine", "hbs");
app.set("views", "./plantillas");

// Crear
app.post('/productos', (req, res) => {
    const data = req.body
    _productos.addPrd(data)
    io.sockets.emit('productos', _productos.getAll());
    res.redirect('/')
})

io.on('connection', socket => {
    console.log('Un cliente se ha conectado');
    socket.emit('productos', _productos.getAll());

    socket.on('new-message', data => {
        messages.push(data);
        io.sockets.emit('messages', messages);
    });

});

const PORT = process.env.PORT || 8080
const connectedServer = httpServer.listen(PORT, ()=> { console.log("Servidor http con web sockets listo") })
connectedServer.on("error", error => console.log)






