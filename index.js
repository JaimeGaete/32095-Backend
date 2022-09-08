const express = require('express')
const { engine  } = require('express-handlebars')
const app = express()

// routers
const productoRouter = require('./routes/productos')
const carritoRouter = require('./routes/carrito')

// funciones
const errores = require('./functions/error')
const cfg = require('./config/configuration')

// handlebars 
app.engine( "hbs", engine ({ extname: ".hbs" }));
app.set("view engine", "hbs");
app.set("views", "./views");

// app.use
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use('/api/productos', productoRouter)
app.use('/api/carrito', carritoRouter)
app.use(errores.errorLogger)
app.use(errores.errorResponder)
app.use(errores.invalidPathHandler)


/*------------ Inicio ------------*/
const PORT = process.env.PORT || cfg.configuration.PORT

const server = app.listen(PORT, () => {
    console.log(`Server on ${server.address().port}`)
})

server.on("error", error => console.log(`Server error:  ${error}`))



