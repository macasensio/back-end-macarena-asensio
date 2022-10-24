const knex = require('knex')

/*class Mensajes {
    constructor(){        
        this.mensajes = []
        this.id = 0
    }*/
class MensajesSqlite3 {
    constructor(configConnection, tabla){
        this.knex = knex(configConnection)
        this.tabla = tabla
        console.log('configConnection')
        console.log(configConnection)
    }    

    // ---------- métodos privados ----------//
    /*#chequearArray(array) {
        if (array.length > 0) {
            return true
        } else {
            return false
        }
    }*/

    // ---------- métodos públicos ----------//
    async crearTabla(){
        console.log('CREAR TABLA MENSAJES EJECUTANDOSE')
        try {            
            if (knex(this.tabla).select('*') == undefined) {
                await knex.schema.createTable(this.tabla, table => {
                    table.increments('id')
                    table.string('text')
                    table.string('author')
                    table.string('fyh')
                })
            }
        } catch (error) {
            // console.log('---- Error en MensajesSqlite3.crearTabla() ----')
            // console.log(error)
            return new Error(`Error ${error}`)
        }
    }


    async listarTodos(){
        try {
            const mensajesDDBB = await this.knex.from(this.tabla).select('*')
            console.log('estos son los mensajes de la DDBB Sqlite3')
            console.log(mensajesDDBB)
            return mensajesDDBB
        } catch (error) {
            // console.log('---- Error en MensajesSqlite3.listarTodos() ----')
            // console.log(error)
            return new Error(`Error ${error}`)
        }
    }
    /*listarTodos() {
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
    }*/

    async guardar(msj){
        try {
            console.log('msj recibido para ser guardado')
            console.log(msj)            
            return await this.knex(this.tabla).insert(msj)
        } catch (error) {
            // console.log('---- Error en MensajesSqlite3.guardar(msj) ----')
            // console.log(error)
            return new Error(`Error ${error}`)
        }
    }
    
    /*guardar(msj) {
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
    }*/  
}

module.exports = MensajesSqlite3