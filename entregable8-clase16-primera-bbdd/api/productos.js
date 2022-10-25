const knex = require('knex')
class productosMariaDB {

    constructor(configConnection, tabla){
        this.knex = knex(configConnection)
        this.tabla = tabla
    }


    async listarTodos(){
        //console.log('listarTodos() PRODUCTOS EJECUTANDOSE')
        try {
            //console.log('estos son los productos de la DDBB Mysql')
            const productosDDBB = await this.knex.from(this.tabla).select('*')
            //console.log('productosDDBB')
            //console.log(productosDDBB)
            return productosDDBB
            //return await this.knex.from(this.tabla).select('*')
        } catch (error) {
            console.log('---- Error en productosMariaDB.listarTodos() ----')
            // console.log(error)
            //return new Error(`Error ${error}`)
        }
    }


    async guardar(prod){
        console.log('prod recibido para guardarse')
        console.log(prod)
        console.log('guardar(prod) PRODUCTOS EJECUTANDOSE')
        try {
            console.log('guardar(prod) ejecutada ok')
            return await this.knex(this.tabla).insert(prod)
        } catch (error) {
            console.log('---- Error en productosMariaDB.guardar(prod) ----')
            console.log(error)
            return new Error(`Error ${error}`)
        }
    }
}

module.exports = productosMariaDB