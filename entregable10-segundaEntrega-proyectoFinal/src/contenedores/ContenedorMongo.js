import mongoose from "mongoose";
const Productos = require('../models/producto.model')

class ContenedorMongoDb {
    constructor(){
        this.connect() //esto auto-ejecuta mi método connect()
    }

    //conexión a mi ddbb
    connect(){
        try {
            //const URL = 'mongodb://localhost:27017/ecommerce'
            const URL = 'mongodb+srv://maca:1234@cluster0.aco5nwv.mongodb.net/ecommerce' //como aún no existe mi ddbb "ecommerce", me la crea
            mongoose.connect(URL, {
                useNewUrlParser: true, //sirve para parsear la URL
                useUnifiedTopology: true //
            })
            console.log('Database connected')
        } catch (error) {
            console.log(error)
        }
    }

    //creamos un nuevo usuario
    async createUser(user){
        try {
            const newUser = new Usuarios(user)
            await newUser.save()
            console.log('User Created')
        } catch (error) {
            console.log(error)
        }
    }

    //leer usuarios
    async getUsers(){
        try {
            const users = await Usuarios.find()
            //leemos usuarios con filtro aplicado
            //const users = await Usuarios.find({apellido: 'Asensio'}, {nombre: 1, apellido: 1, _id: 0})
            //const users = await Usuarios.find({password: '123456'}, {nombre: 1, apellido: 1, _id: 0}).sort({nombre: 1}) //sort por nombre, con el 1 le indico que es de manera ascendente. lo toma por orden alfabético
            //const users = await Usuarios.find({password: '123456'}, {nombre: 1, apellido: 1, _id: 0}).sort({nombre: 1}).skip(1)
            //const users = await Usuarios.find({password: '123456'}, {nombre: 1, apellido: 1, _id: 0}).sort({nombre: 1}).skip(1).limit(2)

            console.log(users)
        } catch (error) {
            console.log(error)
        }
    }

    //update usuario
    async updateUser() {
        try {
            await Usuarios.updateOne({nombre: 'Fede'}, {$set: {nombre: 'Juan'}})
            console.log('User updated')
        } catch (error) {
            console.log(error)
        }
    }

    //delete usuario
    async deleteUser() {
        try {
            await Usuarios.deleteOne({nombre: 'Juan'})
            console.log('User deleted')
        } catch (error) {
            console.log(error)
        }
    }
}

export default ContenedorMongoDb

const users = new Users()
// users.createUser({ nombre: 'Fede', apellido: 'Perez', email: 'fp@gmail.com', username: 'fedeperez', password: '123456'})
// users.createUser({ nombre: 'Mac', apellido: 'Asensio', email: 'ma@gmail.com', username: 'masensio', password: '123456'})
// users.createUser({ nombre: 'Luchi', apellido: 'Gigena', email: 'lg@gmail.com', username: 'lugigena', password: '123456'})
// users.createUser({ nombre: 'Pedro', apellido: 'Suarez', email: 'ps@gmail.com', username: 'pesuarez', password: '123456'})
//users.updateUser()
//users.deleteUser()
users.getUsers()