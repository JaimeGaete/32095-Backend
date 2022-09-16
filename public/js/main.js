const socket = io.connect()

/************** PRODUCTOS  ***************/

function obtenerPlantillaProductos(productos)
{
    return fetch('plantillas/tabla-productos.hbs')
    .then(response => response.text())
    .then(plantilla => {
        const plantillaHBS = Handlebars.compile(plantilla)
        const htmlCompleto = plantillaHBS({productos})
        return htmlCompleto
    })
}

socket.on('productos', async productos => {
    const html =  await obtenerPlantillaProductos(productos)
    document.getElementById('products').innerHTML = html
})


/************** MENSAJES  ***************/

function addMessage(e) {

    const mensaje = {
        email: document.getElementById('email').value,
        fechahora: Date.now(),
        texto: document.getElementById('texto').value
    };

    socket.emit('new-message', mensaje);
    return false;
}

function render(data) {

    console.log ("data", data)

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

socket.on('messages', function(data) { render(data); });

