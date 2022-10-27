//cliente
const socket = io.connect()

// ------------------------------- PRODUCTOS -------------------------------
// addProductos
const addProductos = (e) => {
    console.log('add productos')
    const title = document.getElementById('title').value
    const price = document.getElementById('price').value
    const thumbnail = document.getElementById('thumbnail').value
    socket.emit('new-prod', {title, price, thumbnail})
    return false
}

function makeHtmlTable (productos) {
    return fetch('plantillas/tabla-productos.hbs')
    .then(respuesta => respuesta.text())
    .then(plantilla => {
        const template = Handlebars.compile(plantilla)
        const html = template({productos})
        return html
    })
}

//escucho al servidor
socket.on('productos', productos => {
    console.log('socket.on() -> recibiendo productos')
    console.log(productos)
    makeHtmlTable(productos).then(html => {
        document.getElementById('productos').innerHTML = html
    })
})


// ------------------------------- CHAT -------------------------------

// -- enable/disable inputs
const inputEmail = document.getElementById('inputEmail')
const inputMsj = document.getElementById('inputMensaje')
const btnEnviar = document.getElementById('btnEnviar')

inputEmail.addEventListener('keyup', cambiarEstado)

function cambiarEstado () {
    const value = inputEmail.value
    //console.log(value)
    if(value.includes('@')){
        inputMsj.disabled = false
        btnEnviar.disabled = false
    } else {
        inputMsj.disabled = true
        btnEnviar.disabled = true
    }
}

// addMessage
const addMessage = (e) => {
    const author = document.getElementById('inputEmail').value
    const text = document.getElementById('inputMensaje').value
    const fyh = new Date().toLocaleString()
    socket.emit('new-msj', {text, author, fyh})
    return false
}


const render = (arrayMensajes) => {
    if (arrayMensajes.length > 0) {
        const html = arrayMensajes.map((elem) => {
            return (`
                <div>
                    <b style="color:blue;">${elem.author}</b>
                    [<span style="color:brown;">${elem.fyh}</span>] :
                    <i style="color:green;">${elem.text}</i>
                </div>
            `)
        }).join(" ");
        document.getElementById('messages').innerHTML = html;
    }
}

//escucho al servidor
socket.on('mensajes', (data) => {
    console.log('socket.on() -> recibiendo msjs')
    console.log(data)
    render(data)
})
