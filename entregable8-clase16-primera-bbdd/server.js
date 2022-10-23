//express
const express = require('express')
//APIs
const productosMariaDB = require('./api/productos.js')
const Mensajes = require('./api/mensajes.js')
//Sockets
const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')
//DDBB
const { dbConnection } = require('./config')


//const productosApi = new Productos()
//const mensajesApi = new Mensajes()
const productosApi = new productosMariaDB(dbConnection.mysql, 'productos')


const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer) 


//configuro el socket
io.on('connection', cliente => {
    console.log('Un cliente se conectó')  

    // ----------- CHAT -----------
    //carga inicial de mensajes
    cliente.emit('mensajes', mensajesApi.listarTodos())

    //actualizacion de mensajes
    cliente.on('new-msj', mensaje => {
        mensajesApi.guardar(mensaje)
        io.sockets.emit('mensajes', mensajesApi.listarTodos())
    })


    // ----------- PRODUCTOS -----------
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