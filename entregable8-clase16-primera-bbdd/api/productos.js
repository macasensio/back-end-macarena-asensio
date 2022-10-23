const knex = require('knex')

/*
class Productos {
    constructor(){        
        this.productos = []
        this.id = 0
    }*/

class productosMariaDB {
    constructor(configConnection, tabla){
        this.knex = knex(configConnection)
        this.tabla = tabla
    }


    // ---------- métodos privados ----------//
    /*#chequearArray(array) {
        if (array.length > 0) {
            return true
        } else {
            return false
        }
    }*/
    #chequearTabla(tabla) {
        const contenido = this.knex.from(this.tabla).select('*')
        console.log(contenido)
        if (contenido == null){
            console.log('no hay tabla')
        } else {
            console.log('ni idea qué mostrar')
        }

        if (array.length > 0) {
            return true
        } else {
            return false
        }
    }

    //con el método "chequearArray" sería chequear si existe esa tabla. si no existe, crearla.

    // ---------- métodos públicos ----------//
    async listarTodos(){
        try {
            return await this.knex.from(this.tabla).select('*')
        } catch (error) {
            return new Error(`Error ${error}`)
        }
    }
    /*listarTodos() {
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
    }*/
    
    
    async guardar(prod){
        try {
            return await this.knex(this.tabla).insert(prod)
        } catch (error) {
            return new Error(`Error ${error}`)
        }
    }
    /*guardar(prod) {
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
    }*/
}

module.exports = productosMariaDB