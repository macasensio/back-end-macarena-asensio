const express = require('express')
//const { Router } = express
//const Productos = require('./api/productos.js')

const carritoRouter = require('./routes/carritoRouter')
const productosRouter = require('./routes/productosRouter')

//const productosApi = new Productos()
//const productosRouter = new Router()

//middlewares
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))
//app.use(express.static('./public'))


//rutas
app.use('/api/productos', productosRouter)
app.use('/api/carrito', carritoRouter)

/*
//mostrar todos los productos
productosRouter.get('/', (req, res) => {
    res.json(productosApi.listarTodos())
})

//mostrar un producto por su id
productosRouter.get('/:id', async (req, res) => {
    res.status(200).json(productosApi.listarProducto(req.params.id))
})

//agregar un producto
productosRouter.post('/', (req, res) => {
    res.status(200).json(productosApi.guardar(req.body))
})

//modificar un producto
productosRouter.put('/:id', (req, res) => {
    res.status(200).json(productosApi.actualizar(req.body, req.params.id))
})

//eliminar un producto
productosRouter.delete('/:id', (req, res) => {    
    res.status(200).json(productosApi.eliminar(req.params.id))
})
*/


//server
const PORT = process.env.PORT || 8080
//const PORT = 8080
const server = app.listen(PORT, () => console.log(`Server funcionando en el puerto ${server.address().port}`))
server.on('error',(err) => console.log('Error --> ' + err))