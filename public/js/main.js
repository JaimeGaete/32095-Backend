

let obtenerPlantillaProductos = (productos) =>
{
    return fetch('plantillas/listar-productos.hbs')
    .then(response => response.text())
    .then(plantilla => {
        const plantillaHBS = Handlebars.compile(plantilla)
        const htmlCompleto = plantillaHBS({productos})
        return htmlCompleto
    })
}

let loadProd = () => {
    console.log("test")
}


//socket.on('productos', async productos => {

/*

GENERAR UN ONLOAD EN EL Form para que se ejecute la función en main.js

TENGO QUE OBTENER LOS PRODUCTOS

const html =  await obtenerPlantillaProductos(productos)
document.getElementById('products').innerHTML = html
})
*/

/*
function render(data) {
    const html = data.map((elem, index) => {
        return(`
        <table>
        <tr>
            <td class="msg_email">${elem.email}</td>
            <td class="msg_date">${elem.fechahora}</td>
            <td class="msg_texto">${elem.texto}</td>
        </tr>
        </table>`)
    }).join(" ");
    document.getElementById('messages').innerHTML = html;
}
*/


