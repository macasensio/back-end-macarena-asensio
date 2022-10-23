const knex = require('knex')

class Mensajes {
    constructor(){        
        this.mensajes = []
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
            if (this.#chequearArray(this.mensajes)) {
                console.log('retornando mensajes ---> this.mensajes')
                console.log(this.mensajes)              
                return this.mensajes
            } else {
                return {mensaje: 'No hay mensajes guardados'}
            }
        } catch (error) {
            console.log(error)
        }
    }
    
    guardar(msj) {
        try {
            if (msj) {
                const nuevoMensaje = {...msj, id: ++this.id}
                this.mensajes.push(nuevoMensaje)
                const nuevoArray = this.mensajes
                return nuevoArray
            } else { 
                return ({mensaje: 'faltan datos'})
            }
        } catch (error) {
            console.log(error)
        }
        
    }    
}

module.exports = Mensajes