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
io.on('connection', async cliente => {
    console.log('Un cliente se conectó')

    // ----------- CHAT -----------
    
    //carga inicial de mensajes
    cliente.emit('mensajes', await mensajesApi.listarTodos())

    //actualizacion de mensajes
    cliente.on('new-msj', async mensaje => {
        //guardo mi msj
        await mensajesApi.guardar(mensaje)
        //mando a imprimir mis msjs
        io.sockets.emit('mensajes', await mensajesApi.listarTodos())
    })
    

    // ----------- PRODUCTOS -----------
    //carga inicial de productos
    cliente.emit('productos', await productosApi.listarTodos())

    //actualizacion de productos
    cliente.on('new-prod', async producto => {
        await productosApi.guardar(producto)
        io.sockets.emit('productos', await productosApi.listarTodos())
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