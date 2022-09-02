const socket = io.connect();

function render(data) {
    const html = data.map((elem, index) => {
        return(`<div>
            <strong>${elem.author}</strong>:
            <em>${elem.text}</em> </div>`)
    }).join(" ");
    document.getElementById('messages').innerHTML = html;
}

socket.on('messages', function(data) { render(data); });


/*socket.on("mensajesRecibidos", mensajes =>{
    document.querySelector("p").innerText = mensajes
})
*/

function addMessage(e) {

    console.log("username", document.getElementById('username').value);
    console.log("texto", document.getElementById('texto').value);

    const mensaje = {
        author: document.getElementById('username').value,
        text: document.getElementById('texto').value
    };
    socket.emit('new-message', mensaje);
    return false;
}


