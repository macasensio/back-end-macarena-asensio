const express = require('express')
const { Router } = express
const Productos = require('./api/productos.js')

const productosApi = new Productos()
//const productosRouter = new Router()

//middlewares
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))
//app.use(express.static('./public'))

//Handlebars
const hbs = require('express-handlebars')
//1
app.engine('hbs', hbs.engine({
    extname: '.hbs',
    // partialsDir:__dirname+'/views/partials',
    layoutsDir:__dirname+'/views/layouts',
    defaultLayout: 'formulario',
    defaultLayout: false
}))

//2
app.set('views','views/layouts')
app.set('view engine', 'hbs')


//rutas
//app.use('/api/productos', productosRouter)
/*app.get('/api/productos', productosRouter)
app.post('/api/productos', productosRouter)*/

//mostrar todos los productos
app.get('/', (req, res) => {
    res.render('formulario')
})

//productosRouter.get('/', (req, res) => {
app.get('/productos', (req, res) => {
    //res.send('productosssssssssss')
    res.render('productos')
    //res.json(productosApi.listarTodos())
})

//agregar un producto
//productosRouter.post('/', (req, res) => {
app.post('/productos', (req, res) => {
    console.log(req.body)
    const producto = productosApi.guardar(req.body)
    res.redirect('/productos')
})


//server
const PORT = 8080
const server = app.listen(PORT, () => console.log(`Server funcionando en el puerto ${server.address().port}`))
server.on('error',(err) => console.log('Error --> ' + err))