const express = require('express')

const carritoRouter = require('./routes/carritoRouter')
const productosRouter = require('./routes/productosRouter')


//middlewares
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))


//rutas
app.use('/api/productos', productosRouter)
app.use('/api/carrito', carritoRouter)



//server
const PORT = process.env.PORT || 8080
//const PORT = 8080
const server = app.listen(PORT, () => console.log(`Listen in http://localhost:${server.address().port}`))
server.on('error',(err) => console.log('Error --> ' + err))