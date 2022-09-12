
<h1 align="center"> # Ecommerce Backend :shopping_cart: </h1>

# *Programación Backend Coderhouse - Comisión 32095*

El proyecto "Vista al Valle" es un sitio de e-commerce de Experiencias y Productos tipicos de Chile. Por ejemplo, las Torres del Paine y ventas de vinos.

# Considera:
- Productos con persistencia en base datos.
- Barra de navegación: link por categoría, por producto y link al carro de compras.
- Carrito de compras.
- Detalle de los productos.
- Listado de todos los artículos disponibles al entrar al sitio.

# Creación e Instalación:

Debes instalar  Node.js en tu computador** [(descargar Node.js)](https://nodejs.org/es/download/).

Para instalar las dependencias, en el directorio del proyecto ejecute: 
```
$ npm init -y 
$ npm install express socket.io
$ npm i -g nodemon
```

Para utilizar la aplicación en el modo de desarrollo, ejecute:
```
$ npm start
````
Ejecute [http://localhost:PORT](http://localhost:PORT) para verla en su navegador.


## Librerías utilizadas:
- Express: 4.18.1.

## Endpoints:

El proyecto expone dos apis:


### Productos:

1. Listar todos los productos
```
METHOD: GET
URL: localhost:PORT/api/productos
REQUEST: no tiene.
RESPONSE: 
[
    {
    "nombre": "", 
    "descripcion": "",
    "codigo": "",
    "urlfoto": "",
    "precio": "",
    "stock": ""
    }
]
```

2. Listar producto por su ID

METHOD: GET
URL: localhost:PORT/api/productos/*ID*
REQUEST: no tiene.
RESPONSE: 
[
    {
    "nombre": "", 
    "descripcion": "",
    "codigo": "",
    "urlfoto": "",
    "precio": "",
    "stock": ""
    }
]

3. Agregar uno o más productos

METHOD: POST
URL: localhost:PORT/api/productos
REQUEST: 
[
    {
    "nombre": "", 
    "descripcion": "",
    "codigo": "",
    "urlfoto": "",
    "precio": "",
    "stock": ""
    }
]

RESPONSE: 
{
    "info": "Producto agregado"
}

4. Actualizar un producto

METHOD: PUT
URL: localhost:PORT/api/productos/*ID*
REQUEST: 
[
    {
    "nombre": "", 
    "descripcion": "",
    "codigo": "",
    "urlfoto": "",
    "precio": "",
    "stock": ""
    }
]

RESPONSE: 
{
    "info": "Producto actualizado"
}

5. Eliminar un producto

METHOD: DELETE
URL: localhost:PORT/api/productos/*ID*
REQUEST: 
[
    {
    "nombre": "", 
    "descripcion": "",
    "codigo": "",
    "urlfoto": "",
    "precio": "",
    "stock": ""
    }
]

RESPONSE: 
{
    "info": "Producto eliminado"
}


### Carrito:

