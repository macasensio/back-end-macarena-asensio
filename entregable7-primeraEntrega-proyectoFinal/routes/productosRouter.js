const express = require('express')
const { Router } = express

const File = require('../container/file.js')
const Producto = require('../api/claseProducto.js')

const productosRouter = Router()
const controller = new File('productos')//instancio File
//acá le paso el nombre del archivo, que en este caso es el productos.json

//admin
const admin = true

//GET muestra todo
productosRouter.get('/', (req, res) => {
    //res.json(productosApi.listarTodos())
    console.log('----------- GET -----------')
    //res.status(200).json(controller.getAll())
    let respuesta = controller.getAll()
    console.log('respuestaaaaaaaaaaaaaaaa')
    console.log(respuesta)
    if (respuesta == undefined){
        res.json({mensaje: 'no carrito found'})
    } else {
        res.json({respuesta})
    }

})

//1 - GET :id muestra un producto
productosRouter.get('/:id', (req, res) => {
    //res.status(200).json(productosApi.listarProducto(req.params.id))
    console.log('----------- GET/:id -----------')
    res.status(200).json(controller.getById(req.params.id))
    console.log('req.params.id --> ' + req.params.id)
})

//2 - POST agrego un producto
productosRouter.post('/', (req, res) => {
    //res.status(200).json(productosApi.guardar(req.body))
    console.log('----------- POST -----------')   
    if (admin) {
        let body = req.body        
        let product = new Producto(body.name, body.description, body.code, body.pic, body.price, body.stock)
        res.status(200).json(controller.save(product))
    } else {
        console.log('acceso denegado')
        res.status(401).json({error: -1, descripcion: 'ruta http://localhost:8080/api/productos - método POST - no autorizada'})
    }
    
})

//3 - PUT modificar un producto
productosRouter.put('/:id', (req, res) => {
    console.log('----------- PUT/:id -----------')
    if(admin) {
        //res.status(200).json(productosApi.actualizar(req.body, req.params.id))
        let id  = req.params.id
        console.log('req.params.id --> ' + req.params.id)
        let product = {...req.body, id: parseInt(id)} //acá le paso todos los campos del body y el id del req.params
        console.log('productttttttttt')
        console.log(product)
        console.log('req.bodyyyyyyyyyyyy')
        console.log(req.body)
        console.log('idddddddddd')
        console.log(id)
        res.status(200).json(controller.update(product))
    } else {
        console.log('acceso denegado')
        res.status(401).json({error: -1, descripcion: 'ruta http://localhost:8080/api/productos/:id - método PUT - no autorizada'})
    }
    
})

//DELETE all
productosRouter.delete('/', (req, res) => {
    console.log('----------- DELETE -----------')
    if(admin) {
        //res.status(200).json(productosApi.eliminar(req.params.id))
        res.status(200).json(controller.deleteAll())
    } else {
        console.log('acceso denegado')
        res.status(401).json({error: -1, descripcion: 'ruta http://localhost:8080/api/productos - método DELETE - no autorizada'})
    }
})

//4 - DELETE eliminar un producto
productosRouter.delete('/:id', (req, res) => {
    if(admin){
        console.log('----------- DELETE/:id -----------')
        //res.status(200).json(productosApi.eliminar(req.params.id))
        res.status(200).json(controller.deleteById(req.params.id))
        console.log('req.params.id --> ' + req.params.id)
    } else {
        console.log('acceso denegado')
        res.status(401).json({error: -1, descripcion: 'ruta http://localhost:8080/api/productos/:id - método DELETE - no autorizada'})
    }
})

module.exports = productosRouter