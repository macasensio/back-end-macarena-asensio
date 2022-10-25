const knex = require('knex')

class MensajesSqlite3 {

    constructor(configConnection, tabla){
        this.knex = knex(configConnection)
        this.tabla = tabla
    }    

    async listarTodos(){
        console.log('listarTodos los mensajes')
        try {
            const mensajesDDBB = await this.knex.from(this.tabla).select('*')
            //console.log('estos son los mensajes de la DDBB Sqlite3')
            console.log(typeof mensajesDDBB)
            //return JSON.parse(JSON.stringify(mensajesDDBB))
            return mensajesDDBB
        } catch (error) {
            console.log('---- Error en MensajesSqlite3.listarTodos() ----')
            // console.log(error)
            //return new Error(`Error ${error}`)
        }
    }


    async guardar(msj){
        console.log('guardar(msj) MENSAJES EJECUTANDOSE')
        try {
            console.log('msj recibido para ser guardado')
            console.log(msj)            
            console.log('msj guardado')
            return await this.knex(this.tabla).insert(msj)
        } catch (error) {
            console.log('---- Error en MensajesSqlite3.guardar(msj) ----')
            // console.log(error)
            //return new Error(`Error ${error}`)
        }
    }

}

module.exports = MensajesSqlite3