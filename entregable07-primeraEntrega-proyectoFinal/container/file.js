//importo fs
const fs = require('fs')

module.exports = class File {
    constructor(rutaArchivo){
        this.rutaArchivo = `${__dirname}/db/${rutaArchivo}.json`
    }

    //métodos
    //leer todo
    #leerUnArchivo (){
        try {
            const contenido = fs.readFileSync(this.rutaArchivo, 'utf-8')
            const contenidoParseado = JSON.parse(contenido)
            return contenidoParseado      
        } catch (error) {
            console.log(error)
        }
    }

    //----------- GET -----------
    getAll(){ // devuelve un array con los objetos presentes en el archivo
        try {
            const contenido = this.#leerUnArchivo()
            if (contenido.length > 0) {
                return ({contenido})
            } else {
                let msjError = 'Archivo vacío'
                return msjError
            }
        } catch (error) {
            console.log(error)
        }
    }   

    //----------- GET/:id -----------
    getById(id){ //recibe un id y devuelve el objeto con ese id, o null si no está
        try {
            const contenido = this.#leerUnArchivo()
            const contenidoFiltrado = contenido.filter(contenido => contenido.id == id)
            if (contenidoFiltrado.length > 0) {
                const index = contenido.findIndex(elem => {//acá encuentro mi index
                    elem.id == contenido.id
                })
                return contenidoFiltrado
            } else {
                console.log(`Error - el objeto con el id ${id} no existe`)
                let msjError = `Error - el objeto con el id ${id} no existe`
                return msjError
            }   
        } catch (error) {
            console.log(error)
        }
    }

    //----------- POST PRODUCTOS -----------
    save(obj){ //recibe un objeto, lo guarda en el archivo, devuelve el id asignado
        try {
            const contenidoArchivo =  this.#leerUnArchivo()
            if (contenidoArchivo.length !==0) {
                fs.writeFileSync(this.rutaArchivo, JSON.stringify([...contenidoArchivo, {id: contenidoArchivo[contenidoArchivo.length-1].id + 1, ...obj, }], null, 3), 'utf-8')
                return ({'Archivo guardado': obj})
            } else {
                fs.writeFileSync(this.rutaArchivo, JSON.stringify([{ id: 1, ...obj}]), 'utf-8')
                return ({response: 'Primer objeto agregado al archivo.', obj}) 
            }        
        } catch (error) {
            console.log(error)
        }
    }

    //----------- POST/:id/productos PRODUCTOS en CARRITO -----------
    async savePC(carritoId, productoAagregar){ //recibe un objeto, lo guarda en el archivo, devuelve el id asignado
        productoAagregar = productoAagregar[0]
        try {
            const contenidoArchivo =  this.#leerUnArchivo()
            if (contenidoArchivo.length !==0) {
                let carritoAUpdatear = contenidoArchivo.find(carrito => carrito.id == carritoId)
                if (carritoAUpdatear !== undefined) {
                    const productosArray = carritoAUpdatear.productos
                    productosArray.push(productoAagregar)
                    fs.writeFileSync(this.rutaArchivo, JSON.stringify([...contenidoArchivo], null, 3), 'utf-8')
                    return({response: 'Saved'})
                } else {
                    let respuesta = 'El carrito no existe'
                    return ({respuesta})
                }
            } else {                
                console.log('No exixte carrito')
                return ({response: 'No existe carrito'}) 
            }
            
        } catch (error) {
            console.log(error)
        }        
    }

    //----------- PUT/:id -----------
    update(obj){
        try {
            const contenido = this.#leerUnArchivo()
            if (contenido.length > 0) {
                const one = contenido.find(element => element.id == obj.id)
                //acá primero encuentro el elemento en mi json.
                if (one != undefined) {
                    let newElement = {...one, ...obj} //acá le agrego lo que encontré a mi producto que recibo por argumento.
                    //el ...spreadOperator lo que hace es juntar los 2 productos que junto. se mezclan. lo que hace es reemplazar mi one con mis datos nuevos recibidos opr argumnto (prod)
                    const index = contenido.findIndex(elem => {//acá encuentro mi index
                        if (elem.id == newElement.id){
                            return true
                        }
                    })
                    contenido[index] = newElement
                    //await fs.promises.writeFile(this.rutaArchivo, JSON.stringify(this.productos)
                    fs.writeFileSync(this.rutaArchivo, JSON.stringify(contenido, 'utf-8'))
                    return ({'Producto modificado': newElement})
                } else {
                    console.log(`Error - el objeto con el id ${obj.id} no existe`)
                    const msjError = `Error - el objeto con el id ${obj.id} no existe`
                    return ({Error: msjError})
                }
            } else {
                console.log('Archivo vacío.')
            }
        } catch (error) {
            console.log(error)
        }
    }

    //----------- DELETE/:id PRODUCTOS-----------
    deleteById(id){ //elimina del archivo el objeto con el id buscado        
        try {
            const contenido = this.#leerUnArchivo()
            const contenidoAEliminar = contenido.filter(contenido => contenido.id == id)
            if (contenidoAEliminar.length > 0) {
                const contenidoFiltrado = contenido.filter(contenido => contenido.id != id)
                fs.writeFileSync(this.rutaArchivo, JSON.stringify(contenidoFiltrado), 'utf-8')
                return ({'Contenido eliminado': contenidoAEliminar})
            } else {
                console.log(`El objeto con el id ${id} que intenta borrar no existe en el archivo`)
                const msjError = `El objeto con el id ${id} que intenta borrar no existe en el archivo`
                return ({Error: msjError})
            }
        } catch (error) {
            console.log(error)
        }        
    }

    //----------- DELETE/:id/productos/:id_prod PRODUCTOS EN CARRITO -----------
    deleteByIdPC(carritoId, productoId){ //elimina del archivo el objeto con el id buscado        
        try {
            const contenido = this.#leerUnArchivo()
            if (contenido.length !== 0) {

                const carritoAUpdatear = contenido.find(contenido => contenido.id == carritoId)                
                const arrayProductos = carritoAUpdatear.productos
                const arrayNuevo = arrayProductos.filter(contenido => contenido.id != productoId)
                carritoAUpdatear.productos = arrayNuevo
                fs.writeFileSync(this.rutaArchivo, JSON.stringify([...contenido], null, 3), 'utf-8')
                return ({Mensaje: 'contenido eliminado'})
            } else {
                const msjError = `El objeto con el id ${id} que intenta borrar no existe en el archivo`
                return ({Error: msjError})
            }
        } catch (error) {
            console.log(error)
        }        
    }
    
    //----------- DELETE ALL -----------
    deleteAll(){ // elimina todos los objetos presentes en el archivo
        try {
            const contenido = this.#leerUnArchivo()
            if (contenido.length > 0) {
                fs.writeFileSync(this.rutaArchivo, '[]', 'utf-8') 
                console.log('Objetos del archivo eliminados. Archivo ahora vacío.')
                let respuesta = 'Objetos del archivo eliminados. Archivo ahora vacío.'
                return ({Respuesta: respuesta})
            } else {
                console.log('No se puede vaciar un archivo ya vacío.')
                const msjError = `No se puede vaciar un archivo ya vacío.`
                return ({Error: msjError})
            }
        } catch (error) {
            console.log(error)
        }
    }

}