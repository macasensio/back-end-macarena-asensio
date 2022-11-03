import express from 'express'
const { Router } = express

const app = express()

const productosRouter = new Router()
const carritosRouter = new Router()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
//app.use(express.static('../public'))

app.use('/api/productos', productosRouter)
app.use('/api/carritos', carritosRouter)


//listar todos
productosRouter.get('/', async (req, res) => {
    res.status(200).send('GET /api/productos')
})

//listar uno
productosRouter.get('/:id', async (req, res) => {
    res.status(200).send('GET ID /api/productos')
})

//agregar uno
productosRouter.post('/', async (req, res) => {
    res.status(200).send('POST /api/productos')
})

//updatear uno
productosRouter.put('/:id', async (req, res) => {
    res.status(200).send('UPDATE ID /api/productos')
})

//eliminar uno
productosRouter.delete('/:id', async (req, res) => {
    res.status(200).send('DELETE ID/api/productos')
})



export default app