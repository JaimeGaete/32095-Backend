import app from './index.js'
import param from './param/parametros.js'

const PORT = process.env.PORT || param.PORT

const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})

server.on("error", error => console.log(`Error en servidor ${error}`))