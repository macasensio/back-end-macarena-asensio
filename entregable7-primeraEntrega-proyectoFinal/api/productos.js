class Productos {
    constructor(){        
        this.productos = []
        this.id = 0
    }


    // ---------- métodos privados ----------//
    #chequearArray(array) {
        if (array.length > 0) {
            return true
        } else {
            return false
        }
    }
    #msjArrayVacio() {
        return {mensaje: 'No puede realizar esta acción porque no hay productos'}
    }

    #filtrarProducto(id) {
        const productoFiltrado = this.productos.filter(prod => prod.id == id)
        if(productoFiltrado.length > 0) {
            return productoFiltrado
        } else {
            return false
        }
    }

    // ---------- métodos públicos ----------//
    listarTodos() {
        try {
            if (this.#chequearArray(this.productos)) {                
                return this.productos
            } else {
                return {mensaje: 'No hay productos'}
            }
        } catch (error) {
            console.log(error)
        }
    }

    listarProducto(id) {
        try {
            if (this.#chequearArray(this.productos)) {
                const prod = this.#filtrarProducto(id)
                if (prod) {
                    return ({mensaje: `mostrar producto con id ${id}`, prod: prod})
                } else {
                    return {error: `Producto con ${id} no encontrado`}
                }
            } else {
                return this.#msjArrayVacio()
            }
        } catch (error) {
            console.log(error)
        }        
    }

    guardar(prod) {
        try {
            if (prod) {
                const nuevoProducto = {...prod, id: ++this.id}
                this.productos.push(nuevoProducto)
                return ({mensaje: 'producto guardado', prod})
            } else { 
                return ({mensaje: 'faltan datos'})
            }
        } catch (error) {
            console.log(error)
        }
        
    }

    actualizar(prod, id) {
        try {
            if (this.#chequearArray(this.productos)) {
                console.log(prod)
                console.log('id --> '+id)
                const nuevoProducto = {...prod, id: Number(id)}
                const index = this.productos.findIndex(prod => prod.id == id)
                if (index !== -1) {
                    this.productos[index] = nuevoProducto
                }
                return {mensaje: `producto con id ${id} modificado`}
            } else {
                return this.#msjArrayVacio()
            }
        } catch (error) {
            console.log(error)
        }
        
    }

    eliminar(id) {
        try {
            if (this.#chequearArray(this.productos)) {
                const prodAEliminar = this.#filtrarProducto(id)
                if (prodAEliminar.length > 0) {
                    const arrayNuevo = this.productos.filter(prod => prod.id != id)
                    this.productos = arrayNuevo
                    return {mensaje: `bye bye producto con id ${id}`, arrayNuevo}
                } else {
                    return {error: `Producto con ${id} no encontrado`}
                }
            } else {
                return this.#msjArrayVacio()
            }
        } catch (error) {
            console.log(error)
        }
        
    }
}

module.exports = Productos