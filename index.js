const express = require("express")
const { Server: HttpServer } = require("http")
const { Server: IOServer } = require("socket.io")

const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

const messages = []

app.use(express.static("public"))


/*
io.on("connection", socket =>{
    console.log("Nuevo cliente conectado")

    socket.on("mensajeEnviado",  mensajes =>{
        console.log(mensajes)
        io.sockets.emit("mensajesRecibidos", mensajes )
    })

})
*/

io.on('connection',socket => {
    console.log('Un cliente se ha conectado');
    socket.emit('messages', messages);

    socket.on('new-message',data => {
        messages.push(data);
        io.sockets.emit('messages', messages);
    });
 });

const connectedServer = httpServer.listen(8080, ()=>{
    console.log("Servidor http con web sockets listo")
})

connectedServer.on("error", error => console.log)






