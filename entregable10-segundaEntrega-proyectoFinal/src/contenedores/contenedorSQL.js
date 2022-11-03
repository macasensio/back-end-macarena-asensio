//importo mi objeto option
const { option } = require('./config') 

//const knex = require('knex')(option)//le paso como argumento mi obj option
// --> acá uso mysql --> const knex = require('knex')(option.mysql)
// acá uso sqlite3
//const knex = require('knex')(option.sqlite)
const knex = require('knex')(option.mysql)
console.log('option.mysql')
console.log(option.mysql)

//1 - crear tabla
//.createTable('nombre de mi tabla', callback)
/*
knex.schema.createTable('automoviles', table => {
    table.increments('id')//esto es para que se cree el id y se autoincremente solo --> autoincremental
    table.string('marca')//columna - string
    table.string('modelo')//columna - string
    table.integer('anio')//columna - integer -> numero entero
})
    .then(() => console.log('Tabla creada'))
    .catch((err) => { console.log(err); throw err })
    .finally(() => knex.destroy()) // esto sirve para destruir la conexión y deje de escuchar
*/


//2 - insertar registros
// array autos
/*
const autos = [
    {marca: 'Ford', modelo: 'Fiesta', anio: 2022},
    {marca: 'Ford', modelo: 'Focus', anio: 2015},
    {marca: 'Audi', modelo: 'A4', anio: 2021},
    {marca: 'Audi', modelo: 'A2', anio: 2015},
    {marca: 'Renault', modelo: 'Megane', anio: 2021},
    {marca: 'Kia', modelo: 'Verano', anio: 2018},
    {marca: 'Ford', modelo: 'Fiesta', anio: 2022},
    {marca: 'Ford', modelo: 'Focus', anio: 2022},
    {marca: 'Audi', modelo: 'A4', anio: 2021},
    {marca: 'Audi', modelo: 'A2', anio: 2019},
    {marca: 'Renault', modelo: 'Megane', anio: 2022},
    {marca: 'Kia', modelo: 'Verano', anio: 2018}
]



knex('automoviles').insert(autos)
    .then(() => console.log('Registros insertados'))
    .catch(err => {console.log(err); throw err})
    .finally(() => knex.destroy())
*/


//Seleccionamos
/*
knex('automoviles').select('*') // --> select * (todo) de la tabla automóviles
    .then((data) => console.log(data))
    .catch(err => {console.log(err); throw err})
    .finally(() => knex.destroy())
*/


// ---------- Select where ----------
//traeme de productos
//el where recibe 3 parámetros
// 1 -> el campo
// 2 -> a qué va a ser =, >, >=, <=
// 3 -> el valor que busco
/*
knex.from('automoviles').select('modelo', 'anio').where('anio', '=', 2019)
//esto se lee -> de automoviles traeme los campos modelo y anio cuando el modelo sea igual a Fiesta
    .then((data) => console.log(data))
    .catch(err => {console.log(err); throw err})
    .finally(() => knex.destroy())
    */

//.andWhere('','') --> sumando un where más .andWhere()
//esto es con que uno de los 2 se cumpla. es un OR
knex.from('automoviles').select('marca', 'modelo', 'anio', 'id').where('anio', '>=', 2020).andWhere('marca', 'Audi')
    .then((data) => console.log(data))
    .catch(err => {console.log(err); throw err})
    .finally(() => knex.destroy())


// ---------- Order by ----------
//recibe 2 parámetros
// 1 - campo a ordenar
// 2 - desc - asc
//por default es ascendente
/*
knex.from('automoviles').select('modelo', 'anio').where('anio', '>', 2015).orderBy('anio', 'asc')
    .then((data) => console.log(data))
    .catch(err => {console.log(err); throw err})
    .finally(() => knex.destroy())
*/

// ---------- Update ----------
/*
knex.from('automoviles').where('marca', 'Chevrolet').update({marca: 'Kia'})
    .then(() => console.log('Registro actualizado'))
    .catch(err => {console.log(err); throw err})
    .finally(() => knex.destroy())
    */

// ---------- Delete un registro ----------
/*
knex.from('automoviles').where('marca', 'Kia').del() //acá le digo --> cuando la marca sea Kia, borralo
    .then(() => console.log('Registro eliminado'))
    .catch(err => {console.log(err); throw err})
    .finally(() => knex.destroy())
*/

// ---------- Delete All ----------
/*
knex('automoviles').del() //acá le digo --> cuando la marca sea Kia, borralo
    .then(() => console.log('Todos los registros'))
    .catch(err => {console.log(err); throw err})
    .finally(() => knex.destroy())
*/


//fx anónima autoejecutada --> no funciona con async asique se hizo fx normal
/*
async function batch() {
    try {

        //inserto
        const autosInsertados = await knex('automoviles').insert(autos)
        console.log(autosInsertados)

        //leer todos
        const todos = await knex.from('automoviles').select('*')
        console.log(todos)

        //filtro
        const filtrados = await knex.from('automoviles').select('modelo', 'anio').where('anio', '>', 2017).orderBy('anio', 'desc')
        console.log(filtrados)

    } catch {    
        console.log(error)
    } finally {
        knex.destroy()
    }
}

batch()
*/