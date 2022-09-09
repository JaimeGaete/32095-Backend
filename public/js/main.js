
const prod_all_url = "http://localhost:8080/api/productos/"
const carrito_create_url = "http://localhost:8080/api/carrito/"
const plantilla_listar_prod = 'plantillas/listar-productos.hbs'


/***** Sitio Publico - Listar los productos para agregar al carro ***********/

let carritoCreate = () => 
{
    return fetch(carrito_create_url, { method: 'POST' })
    .then(response => response.json())
    .catch(error => console.error('Error:', error))
    .then(response => { 
        console.log('Success:', response)
        return response
    })
}

let obtenerPlantillaProductos = (productos) =>
{
    return fetch(plantilla_listar_prod)
    .then(response => response.text())
    .then(plantilla => {
        const plantillaHBS = Handlebars.compile(plantilla)
        const htmlCompleto = plantillaHBS({productos})
        return htmlCompleto
    })
}

let productosGetAll = () => 
{
    return fetch(prod_all_url, { method: 'GET' })
    .then(response => response.json())
    .catch(error => console.error('Error:', error))
    .then(response => { 
        console.log('Success:', response)
        return response
    })
}

let getAll = async () => 
{
    // recupero los productos y los cargo en la plantilla
    let productos = await productosGetAll()
    const html =  await obtenerPlantillaProductos(productos)
    document.getElementById('products').innerHTML = html

    // solución para asignar el id de carro a cada producto - creo el carro y el action usa el ID creado del carro para asociar los productos
    let id = await carritoCreate()
    document.getElementById('form_action').action = `/api/carrito/${id}/productos`
  
}

/*
Handlebars.registerHelper('print_idCarro', async function () {
    return fetch(carrito_create_url, { method: 'POST' })
    .then(response => response.json())
    .catch(error => console.error('Error:', error))
    .then(response => { 
        console.log('Success:', response)
        return response
    })
})
*/


/***** Sitio Privado ***********/




