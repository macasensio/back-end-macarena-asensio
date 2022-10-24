//express
const express = require('express')
//APIs
const productosMariaDB = require('./api/productos.js')
const MensajesSqlite3 = require('./api/mensajes.js')
//Sockets
const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')
//DDBB
const { dbConnection } = require('./config')


//const productosApi = new Productos()
//const mensajesApi = new Mensajes()
const productosApi = new productosMariaDB(dbConnection.mysql, 'productos')
const mensajesApi = new MensajesSqlite3(dbConnection.sqlite, 'mensajes')


const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer) 


//configuro el socket
io.on('connection', cliente => {
    console.log('Un cliente se conectó')

    // ----------- CHAT -----------
    mensajesApi.crearTabla()
    //carga inicial de mensajes
    cliente.emit('mensajes', mensajesApi.listarTodos())

    //actualizacion de mensajes
    cliente.on('new-msj', mensaje => {
        console.log('mensaje que va a guardarse a la ddbb')
        console.log(mensaje)
        //guardo mi msj
        mensajesApi.guardar(mensaje)
        //mando a imprimir mis msjs
        io.sockets.emit('mensajes', mensajesApi.listarTodos())
    })


    // ----------- PRODUCTOS -----------
    productosApi.crearTabla()

    //carga inicial de productos
    cliente.emit('productos', productosApi.listarTodos())

    //actualizacion de productos
    cliente.on('new-prod', producto => {
        productosApi.guardar(producto)
        io.sockets.emit('productos', productosApi.listarTodos())
    })
})

//middlewares
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('./public'))


//server
httpServer.listen('4000', () => {
    console.log(`listening on *:4000`)
})