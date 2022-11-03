//acá traigo todo el módulo
let admin = require("firebase-admin");

//acá traigo las configuraciones de la apikey
let serviceAccount = require("./mac-backend-ecommerce-firebase-adminsdk-8naup-5111acaa21.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

CRUD()

async function CRUD(){
    const db = admin.firestore() //firestore es la herramienta que voy a usar
    const query = db.collection('usuarios')

    //crear
    /*try {
        let id = '1' // el id va con comillas porque como es un id alfanumérico es un string
        const doc = query.doc(`${id}`) //con esto hago referencia a un documento // creo mi documento con id que le paso
        await doc.create({
            nombre: 'Juan',
            apellido: 'Perez',
            edad: 23,
            email: 'j@gmaiil.com'
        })        
    } catch (error) {
        console.log(error)
    }*/


    //leer todos los documentos
    /*try {
        const queryUsuarios = await query.get()
        //let docs = queryUsuarios.docs //acá le digo que me traiga los documentos
        //en docs está la respuesta, por lo que voy a mapear ese array para traer mi data como quiero y el que uiero. armo el obj de la respuesta con lo que me interesa.
        const respuesta = queryUsuarios.docs.map( documentos => ({
            id: documentos.id, ...documentos.data()
            //el id lo pongo por separado porque en firebase, el id está por fuera del resto de mis datos --> id, id.misOtrosDatos
            //con el spread operator lo que hago es hacer un despliegue de toda la data que tiene ese documento. la extraigo con la función .data()
            
        })) // []

        console.log(respuesta)

    } catch (error) {
        console.log(error)
    }*/


    //leer por id
    /*try {
        let id = '1'
        const queryUsuario = query.doc(`${id}`)
        const item = await queryUsuario.get() //await porque lo estoy pidiendo

        //const respuesta = item.data() //acá me devuelve el documento sin el id porque el id es el padre
        const respuesta = {id: item.id, ...item.data()} //acá lo que hago es sumar al id a la respuesta, por lo que asigno a id el item.id y con el spread operator llamo al resto de la data que está bajo mi id

        console.log(respuesta)

    } catch (error) {
        console.log(error)
    }*/


    //update
    /*try {
        const id = '1'
        const doc = query.doc(id)
        const item = await doc.update({
            nombre: 'Lucia',
            edad: 35
        })
        console.log('item actualizado')

    } catch (error) {
        console.log(error)
    }*/


    //delete
    try {
        const id = '3'
        const doc = query.doc(id)
        const item = await doc.delete()
        console.log('item eliminado')
    } catch (error) {
        console.log(error)
    }

}