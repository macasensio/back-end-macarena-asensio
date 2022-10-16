const express = require('express')
const { Router } = express

const File = require('../container/file.js')
const Carrito = require('../api/claseCarrito')

const carritoRouter = Router()
const controller = new File('carrito')
const controllerProductos = new File('productos')

//quiero ver mis carritos
carritoRouter.get('/', async (req, res) => {
    let respuesta = await controller.getAll()
    res.status(200).json({respuesta})
})


//1 - agregar un carri
carritoRouter.post('/', async (req, res) => {
    const cart = new Carrito()
    let respuesta = await controller.save(cart)
    res.status(200).json({respuesta})
})

//2 - eliminar un carri
carritoRouter.delete('/:id', async (req, res) => {
    const { id } = req.params
    res.status(200).json(controller.deleteById(id))
})


//3 - mostrar el carrito
carritoRouter.get('/:id/productos', async (req, res) => {
    let id = req.params.id
    let carrito = await controller.getById(id)
    let index = carrito.findIndex(el => el.id == id)
    if (carrito[index].productos == undefined){
        res.status(200).json({id: carrito.id, Contenido: 'Carrito vacíoooooooooo'})
    } else {
        res.status(200).json({'Carrito N°': carrito[index].id, Contenido: carrito[index].productos})
    }
})


//4 - agregar un producto en mi carrito
carritoRouter.post('/:id/productos', async (req, res) => {
    let carritoId = req.params.id
    const prodId = Number(req.body.prodId)
    let productoAagregar = controllerProductos.getById(prodId)
    let respuesta = await controller.savePC(carritoId, productoAagregar)
    res.status(200).json(respuesta)    
})


//5 - borrar producto
carritoRouter.delete('/:id/productos/:id_prod', async (req, res) => {
    let { id, id_prod } = req.params
    let respuesta = await controller.deleteByIdPC(id, id_prod)
    res.status(200).json({respuesta})
})

module.exports = carritoRouter