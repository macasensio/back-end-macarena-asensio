const express = require('express')
const { Router } = express

const File = require('../container/file.js')
const Producto = require('../api/claseProducto.js')

const productosRouter = Router()
const controller = new File('productos')

//admin
const admin = true

//GET muestra todo
productosRouter.get('/', async (req, res) => {
    let respuesta = await controller.getAll()
    res.status(200).json({respuesta})
})

//1 - GET :id muestra un producto
productosRouter.get('/:id', async (req, res) => {
    let respuesta = await controller.getById(req.params.id)
    res.status(200).json({respuesta})
})

//2 - POST agrego un producto
productosRouter.post('/', async (req, res) => {
    console.log('----------- POST -----------')   
    if (admin) {
        let body = req.body        
        let product = new Producto(body.name, body.description, body.code, body.pic, body.price, body.stock)
        let respuesta = await controller.save(product)
        res.json({respuesta})
    } else {
        res.status(401).json({error: -1, descripcion: 'ruta http://localhost:8080/api/productos - método POST - no autorizada'})
    }
    
})

//3 - PUT modificar un producto
productosRouter.put('/:id', async (req, res) => {
    console.log('----------- PUT/:id -----------')
    if(admin) {
        let id  = req.params.id
        let product = {...req.body, id: parseInt(id)}
        let respuesta = await controller.update(product)
        res.status(200).json(respuesta)
    } else {
        res.status(401).json({error: -1, descripcion: 'ruta http://localhost:8080/api/productos/:id - método PUT - no autorizada'})
    }
    
})

//4 - DELETE eliminar un producto
productosRouter.delete('/:id', async (req, res) => {
    if(admin){
        let respuesta = await controller.deleteById(req.params.id)
        res.status(200).json(respuesta)
    } else {
        res.status(401).json({error: -1, descripcion: 'ruta http://localhost:8080/api/productos/:id - método DELETE - no autorizada'})
    }
})

//DELETE all
productosRouter.delete('/', async (req, res) => {
    console.log('----------- DELETE -----------')
    if(admin) {
        let respuesta = await controller.deleteAll()
        res.status(200).json(respuesta)
    } else {
        res.status(401).json({error: -1, descripcion: 'ruta http://localhost:8080/api/productos - método DELETE - no autorizada'})
    }
})


module.exports = productosRouter