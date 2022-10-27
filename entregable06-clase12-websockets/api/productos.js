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

    // ---------- métodos públicos ----------//
    listarTodos() {
        try {
            if (this.#chequearArray(this.productos)) {
                console.log('retornando productos ---> this.productos')
                console.log(this.productos)              
                return this.productos
            } else {
                return {mensaje: 'No hay productos guardados'}
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
                return nuevoArray
            } else { 
                return ({mensaje: 'faltan datos'})
            }
        } catch (error) {
            console.log(error)
        }
        
    }    
}

module.exports = Productos