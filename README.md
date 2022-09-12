
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

Debe instalar Node.js en tu computador** [(descargar Node.js)](https://nodejs.org/es/download/).

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
*La aplicación por defecto intentará utilizar el puerto 8080 para iniciarse.*

Ejecute [http://localhost:8080](http://localhost:8080) para verla en su navegador.

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
```
METHOD: GET
URL: localhost:PORT/api/productos/*ID*
REQUEST: ID del producto.
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

3. Agregar uno o más productos
```
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
```

4. Actualizar un producto
```
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

*Modifique el ID por el identificador del producto que desea actualizar.*
```

5. Eliminar un producto
```
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
*Modifique el ID por el identificador del producto que desea eliminar.*
```

### Carro:

1. Listar todos los carros
```
METHOD: GET
URL: localhost:PORT/api/carrito
REQUEST: no tiene.
RESPONSE: 

*Cuando el carro no tiene productos:*
[
    {
        "id": ,
        "timestamp": ,
        "productos": []
    }
]

*Cuando el carro tiene productos:*
[
    {
        "id": ,
        "timestamp": ,
        "productos": [
            {
                "nombre": "",
                "descripcion": "",
                "codigo": "",
                "urlfoto": "",
                "precio": "",
                "stock": "",
                "id": ,
                "timestamp": 
            }
        ]
    }
]

*Esta estructura se repetira por cada uno de los carros almacenados*
```

2. Listar carro por su ID
```
METHOD: GET
URL: localhost:PORT/api/carrito/*ID*/productos
REQUEST: ID del carrito.
RESPONSE: 
{
    "id": ,
    "timestamp": ,
    "productos": [
        {
            "nombre": "",
            "descripcion": "",
            "codigo": "",
            "urlfoto": "",
            "precio": "",
            "stock": "",
            "id": ,
            "timestamp": 
        }
    ]
}
```

3. Crear carro
```
METHOD: POST
URL: localhost:PORT/api/carrito
REQUEST: no tiene.
RESPONSE: ID del carrito creado.
```

4. Borrar carro
```
METHOD: DELETE
URL: localhost:PORT/api/carrito/*ID*
REQUEST: ID del carro a eliminar.
RESPONSE: 
{
    "info": "Carro eliminado"
}
```


5. Borrar un producto de un carro
```
METHOD: DELETE
URL: localhost:PORT/api/carrito/*ID*/productos/*ID_PRODUCTO*
REQUEST: ID del carro. ID del producto a eliminar.
RESPONSE: 
{
    "info": "Producto eliminado"
}
```





