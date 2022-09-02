const socket = io.connect();

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
            <td class="msg_date">${hoy()}</td>
            <td class="msg_texto">${elem.texto}</td>
        </tr>
        </table>`)
    }).join(" ");
    document.getElementById('messages').innerHTML = html;
}

socket.on('messages', function(data) { render(data); });


function hoy ()
{
    const dateObj = new Date();

    let year = dateObj.getFullYear();
    
    let month = dateObj.getMonth();
    month = ('0' + month).slice(-2);
    // To make sure the month always has 2-character-formate. For example, 1 => 01, 2 => 02
    
    let date = dateObj.getDate();
    date = ('0' + date).slice(-2);
    // To make sure the date always has 2-character-formate
    
    let hour = dateObj.getHours();
    hour = ('0' + hour).slice(-2);
    // To make sure the hour always has 2-character-formate
    
    let minute = dateObj.getMinutes();
    minute = ('0' + minute).slice(-2);
    // To make sure the minute always has 2-character-formate
    
    let second = dateObj.getSeconds();
    second = ('0' + second).slice(-2);
    // To make sure the second always has 2-character-formate
    
    const time = `${year}/${month}/${date} ${hour}:${minute}:${second}`;
    return time; 
}