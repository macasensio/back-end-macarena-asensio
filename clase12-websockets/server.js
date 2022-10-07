const express = require('express')
const { Router } = express
const Productos = require('./api/productos.js')
const { Server : HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')

const productosApi = new Productos()
//const productosRouter = new Router()

//middlewares
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))
//app.use(express.static('./public'))

const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)


//Handlebars
const hbs = require('express-handlebars')
//1
app.engine('hbs', hbs.engine({
    extname: '.hbs',
    partialsDir:__dirname+'/views/partials',
    defaultLayout: 'index',
    defaultLayout: false
}))

//2
app.set('views','./views')
app.set('view engine', 'hbs')

//mostrar todos los productos
app.get('/', (req, res) => {
    res.render('index')
})

//productosRouter.get('/', (req, res) => {
    app.get('/productos', (req, res) => {
        //res.send('productosssssssssss')
        const productos = productosApi.listarTodos()
        res.render('productos', { productos })
        //res.json(productosApi.listarTodos())
    })
    
//agregar un producto
app.post('/productos', (req, res) => {
    console.log(req.body)
    const producto = productosApi.guardar(req.body)
    res.redirect('/productos')
})




//mansajes guardados en la DDBB
const arrayMens = [
    {author: 'Fede', text: 'Hola, soy Fede'},
    {author: 'Juan', text: 'Hola, soy Juan'},
    {author: 'Sergio', text: 'Hola, soy Sergio'},
]


//server
const PORT = 8080
const server = app.listen(PORT, () => console.log(`Server funcionando en el puerto ${server.address().port}`))
server.on('error',(err) => console.log('Error --> ' + err))

