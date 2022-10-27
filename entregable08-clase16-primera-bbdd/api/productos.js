const knex = require('knex')
class productosMariaDB {

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


    async guardar(prod){try {
            return await this.knex(this.table).insert(prod)
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = productosMariaDB