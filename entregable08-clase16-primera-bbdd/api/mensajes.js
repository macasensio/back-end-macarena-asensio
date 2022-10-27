const knex = require('knex')
class MensajesSqlite3 {

    constructor(configConnection, table){
        this.knex = knex(configConnection)
        this.table = table
    }    

    async listarTodos(){
        try {
            return await this.knex.from(this.table).select('*')
        } catch (error) {
            console.log(error)
        }
    }


    async guardar(msj){
        try {
            return await this.knex(this.table).insert(msj)
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = MensajesSqlite3