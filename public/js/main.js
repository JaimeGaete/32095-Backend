const socket = io.connect()

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

function addMessage(e) {

    const mensaje = {
        email: document.getElementById('email').value,
        fechahora: getDateTime(),
        texto: document.getElementById('texto').value
    };

    socket.emit('new-message', mensaje);
    return false;
}

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

socket.on('messages', function(data) { render(data); });


function getDateTime()
{
    const dateObj = new Date();

    let year = dateObj.getFullYear();
    
    let month = dateObj.getMonth();
    month = ('0' + month).slice(-2);
    
    let date = dateObj.getDate();
    date = ('0' + date).slice(-2);
    
    let hour = dateObj.getHours();
    hour = ('0' + hour).slice(-2);
    
    let minute = dateObj.getMinutes();
    minute = ('0' + minute).slice(-2);
    
    let second = dateObj.getSeconds();
    second = ('0' + second).slice(-2);
   
    return `${year}/${month}/${date} ${hour}:${minute}:${second}`;
}
