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
    
    guardar(prod) {
        try {
            if (prod) {
                const nuevoProducto = {...prod, id: ++this.id}
                this.productos.push(nuevoProducto)
                const nuevoArray = this.productos
                //return ({mensaje: 'producto guardado', prod})
                console.log('Nuevo Array')
                console.log(nuevoArray)
                return 
            } else { 
                return ({mensaje: 'faltan datos'})
            }
        } catch (error) {
            console.log(error)
        }
        
    }    
}

module.exports = Productos