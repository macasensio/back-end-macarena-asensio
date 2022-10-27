class Carrito {
    constructor(productos){
        this.timestamp = new Date().toLocaleString()
        this.productos = productos || []
    }
}

module.exports = Carrito