const express = require('express')
const { Router } = express

const File = require('../container/file.js')
const Carrito = require('../api/claseCarrito')

const carritoRouter = Router()
const controller = new File('carrito')//carrito.json
const controllerProductos = new File('products')//acá le paso el nombre del archivo, que en este caso es el products.json

//1 - agregar un carri
carritoRouter.post('/', (req, res) => {
    //res.status(200).json(productosApi.guardar(req.body))
    // let body = req.body
    // let product = new Producto(body.name, body.description, body.code, body.pic, body.price, body.stock)
    // res.status(200).json(controller.save(product))

    const cart = new Carrito()
    res.json(controller.save(cart))
})

//2 - eliminar un carri
carritoRouter.delete('/:id', (req, res) => {    
    //res.status(200).json(productosApi.eliminar(req.params.id))
    //res.status(200).json(controller.deleteById(req.params.id))

    const { id } = req.params
    res.status(200).json(controller.deleteById(id))
})

//mostrar todos los productos
// carritoRouter.get('/', (req, res) => {
//     //res.json(productosApi.listarTodos())
//     res.status(200).json(controller.getAll())
// })

//3 - mostrar el carrito
carritoRouter.get('/:id/productos', async (req, res) => {
    //res.status(200).json(productosApi.listarProducto(req.params.id))
    //res.status(200).json(controller.getById(req.params.id))

    let id = req.params.id
    let cart = controller.getById(id)
    if (cart.products == undefined){
        res.json({mensaje: 'no carrito found'})
    } else {
        res.json({id: cart.id, products: cart.products})
    }
})

//4 - agregar un producto en mi carrito
carritoRouter.post('/:id/products', (req, res) => {
    //res.status(200).json(productosApi.guardar(req.body))
    // let body = req.body
    // let product = new Producto(body.name, body.description, body.code, body.pic, body.price, body.stock)
    // res.status(200).json(controller.save(product))

    const { id } = req.params
    const cart = controller.getById(id)
    const body = req.body.id_prod

    const productos = body.forEach(id_prod => {
        const prod = controllerProductos.getById(id_prod)
        cart.productos.push(prod)
    })

    let response = controller.update(cart)
    res.status(200).json({response: 'Productos agregados al carrito', cart: response})
})



//5 - borrar producto
carritoRouter.delete('/:id/productos/:id_prod', async (req, res) => {
    //res.status(200).json(productosApi.listarProducto(req.params.id))
    //res.status(200).json(controller.getById(req.params.id))

    let { id, id_prod } = req.params    
    let cart = controller.getById(id)

    let index = cart.productos.findIndex((el, ind) => {
        if(el.id == id_prod) {
            return true
        }
    })

    let nuevosProductos = cart.productos.filter((prod, ind) => prod.id != id_prod)
    console.log(index, cart.productos)
    cart.productos = nuevosProductos

    let response = controller.update(cart)
    res.status(200).json({ repsonse: 'producto eliminado del carrito', cart: response})
})



module.exports = carritoRouter