const express = require('express')
const app = express()

const Contenedor = require('./contenedor.js')
let productos = new Contenedor('./productos.txt')

//INICIO
app.get('/', (req, res) => {
    console.log('\n\n-----------Inicio-------------')
    res.send('<h1 style="color: blue">Desafío clase 6</h1><h3>INICIO</h3><button><a href="/productos">Todos mis productos</a></button><br /><br /><button><a href="/productoRandom">Producto random</a></button>')
})

//PRODUCTOS - devuelve array con todos los productos
app.get('/productos', (req, res) => {
    console.log('\n\n-----------Productos-------------')
    productos.getAll().then(products => res.send(products))  
})

//PRODUCTOS RANDOM - devuelve un producto elegido al azar
app.get('/productoRandom', (req, res) => {
    console.log('\n\n-----------Producto Random-------------')
    productos.getAll().then(products => {
        const productosLength = products.length
        productos.getById(Math.ceil(Math.random()*productosLength)).then(productRandom => res.send(productRandom))
    })
})


const PORT = process.env.PORT || 8080
const server = app.listen(PORT, () => console.log(`Servidor funcionando en el puerto ${PORT}`))

server.on('error', err => console.log(err))