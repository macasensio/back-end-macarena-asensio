const express = require('express')
const { Router } = express

const File = require('../container/file.js')
const Carrito = require('../api/claseCarrito')

const carritoRouter = Router()
const controller = new File('carrito')//carrito.json
const controllerProductos = new File('productos')//acá le paso el nombre del archivo, que en este caso es el products.json

//quiero ver mis carritos
carritoRouter.get('/', (req, res) => {
    //res.json(productosApi.listarTodos())
    console.log('----------- GET -----------')
    //res.status(200).json(controller.getAll())
    let respuesta = controller.getAll()
    console.log('respuestaaaaaaaaaaaaaaaa')
    console.log(respuesta)
    /*if (respuesta !== undefined){
        res.json({Productos: respuesta})
    } else {
        res.json({mensaje: 'no carrito found'})
    }*/
    res.status(200).json({respuesta})
})
//1 - agregar un carri
carritoRouter.post('/', (req, res) => {
    console.log('----------- GET -----------')
    //res.status(200).json(productosApi.guardar(req.body))
    // let body = req.body
    // let product = new Producto(body.name, body.description, body.code, body.pic, body.price, body.stock)
    // res.status(200).json(controller.save(product))

    const cart = new Carrito()
    //res.json(controller.save(cart))
    let respuesta = controller.save(cart)
    res.status(200).json({respuesta})
})

//2 - eliminar un carri
carritoRouter.delete('/:id', (req, res) => {
    console.log('----------- DELETE/:id -----------')    
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
carritoRouter.get('/:id/productos', (req, res) => {
    console.log('----------- GET/:id/productos -----------')
    //res.status(200).json(productosApi.listarProducto(req.params.id))
    //res.status(200).json(controller.getById(req.params.id))
    let id = req.params.id
    console.log('ID')
    console.log(id)
    let carrito = controller.getById(id)
    //res.json({carrito})
    console.log('CARRITO')
    console.log(carrito)
    let index = carrito.findIndex(el => el.id == id)    
    console.log('ID')
    console.log(carrito[index].id)    
    console.log('PRODUCTOS')
    console.log(carrito[index].productos)
    if (carrito[index].productos == undefined){
        res.status(200).json({id: carrito.id, Contenido: 'Carrito vacíoooooooooo'})
    } else {
        res.status(200).json({'Carrito N°': carrito[index].id, Contenido: carrito[index].productos})
    }
})


//4 - agregar un producto en mi carrito
carritoRouter.post('/:id/productos', async (req, res) => {
    console.log('----------- POST/:id/productos -----------')
    //res.status(200).json(productosApi.guardar(req.body))
    // let body = req.body
    // let product = new Producto(body.name, body.description, body.code, body.pic, body.price, body.stock)
    // res.status(200).json(controller.save(product))

    let id = req.params.id
    //console.log('ID')
    //console.log(id)
    //busco mi carrito
    let carrito = await controller.getById(id)
    //console.log('CARRITO TRAIDO')
    //console.log(carrito)
    
    //tengo el id de mi producto a agregar
    const prodId = Number(req.body.prodId)
    //console.log('prodId')
    //console.log(prodId)
    //busco mi producto
    let productoAagregar = controllerProductos.getById(prodId)
    console.log('producto a agregarrrrrrr')
    console.log(productoAagregar)
    console.log('carrito[0].productos')
    console.log(carrito[0].productos)

    //agrego mi producto al carrito
    carrito[0].productos.push(productoAagregar)
    console.log('carritoUpdateado')
    console.log(carrito)
    console.log('productos en mi carrito')
    console.log(carrito[0].productos)

    //método update
    //yo le mando
    console.log('------------- le mando el carrito ------------')
    console.log(carrito)
    controller.save(carrito)

    res.status(200).json({carrito, prodagregado: productoAagregar})
})



//5 - borrar producto
carritoRouter.delete('/:id/productos/:id_prod', async (req, res) => {
    console.log('----------- DELETE/:id/productos/:id_prod -----------')
    //res.status(200).json(productosApi.listarProducto(req.params.id))
    //res.status(200).json(controller.getById(req.params.id))

    let { id, id_prod } = req.params    
    let carrito = await controller.getById(id)

    let index = cart.productos.findIndex(el => {
        if(el.id == id_prod) {
            return true
        }
    })

    let nuevosProductos = carrito.productos.filter(prod => prod.id != id_prod)
    console.log(index, carrito.productos)
    carrito.productos = nuevosProductos

    let response = controller.update(carrito)
    res.status(200).json({ respuesta: 'producto eliminado del carrito', carrito: response})
})



module.exports = carritoRouter