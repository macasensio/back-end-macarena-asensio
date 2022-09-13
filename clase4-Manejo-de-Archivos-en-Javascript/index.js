//importo fs
const fs = require('fs')

class Contenedor {
    constructor(rutaArchivo){
        this.rutaArchivo = rutaArchivo
    }

    //métodos
    //leer todo (fx para ahorrar líneas de código)
    async #leerUnArchivo (){
        try {
            const contenido = await fs.promises.readFile(this.rutaArchivo, 'utf-8')
            const contenidoParseado = JSON.parse(contenido)
            return contenidoParseado      
        } catch (error) {
            console.log(error)
        }
    }

    async save(obj){ //recibe un objeto, lo guarda en el archivo, devuelve el id asignado
        try {
            const contenidoArchivo =  await this.#leerUnArchivo()
            if (contenidoArchivo.length !==0) {
                await fs.promises.writeFile(this.rutaArchivo, JSON.stringify([...contenidoArchivo, {...obj, id: contenidoArchivo[contenidoArchivo.length-1].id + 1}]), 'utf-8')
                console.log('Objeto agregado al archivo.')
            } else {
                await fs.promises.writeFile(this.rutaArchivo, JSON.stringify([{...obj, id: 1}]), 'utf-8')
                console.log('Primer objeto agregado al archivo.')
            }            
        } catch (error) {
            console.log(error)
        }
    }

    async getById(id){ //recibe un id y devuelve el objeto con ese id, o null si no está
        try {
            const contenido = await this.#leerUnArchivo()
            const contenidoFiltrado = contenido.filter(contenido => contenido.id === id)
            if (contenidoFiltrado.length > 0) {
                console.log(`Objeto con el id ${id} pedido: `)
                console.log(contenidoFiltrado)
            } else {
                console.log(`El objeto con el id ${id} que busca no existe en el archivo.`)
            }   
        } catch (error) {
            console.log(error)
        }
    }

    async getAll(){ // devuelve un array con los objetos presentes en el archivo
        try {
            const contenido = await this.#leerUnArchivo()
            if (contenido.length > 0) {
                console.log(`En el archivo hay ${contenido.length} objetos, estos son:`)
                console.log(contenido)        
            } else {
                console.log('Archivo vacío.')
            }
        } catch (error) {
            console.log(error)
        }
    }

    async deleteById(id){ //elimina del archivo el objeto con el id buscado        
        try {
            const contenido = await this.#leerUnArchivo()
            const contenidoAEliminar = contenido.filter(contenido => contenido.id === id)
            if (contenidoAEliminar.length > 0) {
                const contenidoFiltrado = contenido.filter(contenido => contenido.id !== id)
                await fs.promises.writeFile('./products.txt', JSON.stringify(contenidoFiltrado), 'utf-8')
                console.log(`Objeto con id ${id} eliminado`)
            } else {
                console.log(`El objeto con el id ${id} que intenta borrar no existe en el archivo`)
            }
        } catch (error) {
            console.log(error)
        }        
    }

    async deleteAll(){ // elimina todos los objetos presentes en el archivo
        try {
            const contenido = await this.#leerUnArchivo()
            if (contenido.length > 0) {
                await fs.promises.writeFile('./products.txt', '[]', 'utf-8') 
                console.log('Objetos del archivo eliminados. Archivo ahora vacío.')
            } else {
                console.log('No se puede vaciar un archivo ya vacío.')
            }
        } catch (error) {
            console.log(error)
        }
    }//OK

}

const contenedor = new Contenedor('./products.txt')
//contenedor.save({title: 'pantalón', price: '12', thumbail: 'urlImg'})
//contenedor.getById(2)
contenedor.getAll()
//contenedor.deleteById(4)
//contenedor.deleteAll()