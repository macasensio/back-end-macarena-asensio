//const knex = require('knex')
import knex from 'knex'
const { dbConnection } = require('./config')

const knexProd = knex(dbConnection.mysql)
const knexMsjs = knex(dbConnection.sqlite)

const createDataTableProd = async () => {
    //productos
    try {
        
    await knexProd.schema.dropTableIfExists('productos')
    await knexProd.schema.createTable('productos', table => {
        table.increments('id').primary()
        table.string('title').notNullable()
        table.float('price')
        table.string('thumbnail')
    })    
    const productos = [
        {title: 'titulo 1', price: 12, thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-512.png'},
        {title: 'titulo 2', price: 8, thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/plane-paper-toy-science-school-512.png'}
    ]
    
    await knexProd('productos').insert(productos)
    
    } catch (error) {        
        console.log('error creando tabla')
        console.log(error)        
    } finally {        
        await knexProd.destroy()        
    }

    
}

const createDataTableMsjs = async () => {
    
    try {
        
        await knexMsjs.schema.dropTableIfExists('mensajes')
        await knexMsjs.schema.createTable('mensajes', table => {
            table.increments('id')
            table.string('text')
            table.string('author')
            table.string('fyh')
        })    
        const arrayMsjsDePrueba = [
            {text: 'texto 1', author: '1mac@gmail.com', fyh: '24/10/2022, 21:34:16'},
            {text: 'texto 2', author: '2mac@gmail.com', fyh: '24/10/2022, 21:34:16'},
            {text: 'texto 3', author: '3mac@gmail.com', fyh: '24/10/2022, 21:34:16'}
        ]
        
        await knexMsjs('mensajes').insert(arrayMsjsDePrueba)
        
        } catch (error) {            
            console.log('error creando tabla')
            console.log(error)            
        } finally {            
            await knexMsjs.destroy()           
        }
}

//createDataTableProd()
//createDataTableMsjs()

const pedirProductos = async () => {
    console.log(await knexProd.from('productos').select('*'))
}

const pedirMensajes = async () => {
    console.log(await knexMsjs.from('mensajes').select('*'))
}

//pedirProductos()
//pedirMensajes()