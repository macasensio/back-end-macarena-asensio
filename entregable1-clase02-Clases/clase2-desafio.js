class Usuario {
    //constructor
    constructor (nombre, apellido, libros = [], mascotas = []) {
        this.nombre = nombre,
        this.apellido = apellido,
        this.libros = libros,
        this.mascotas = mascotas
    }
    
    //métodos
    getFullName() {
        //retorna el nombre completo del usuario
        return `Soy ${this.nombre} ${this.apellido}`
    }
    addMascota() {
        //recibe un nombre de mascota  lo agrega al array mascotas
        this.mascotas.push(this.mascota)
    }
    countMascotas() {
        //retorna la cantidad de mascotas que tiene el usuario
        return this.mascotas.length
    }
    addBook() {
        //recibe un nombre y un autor y debe agregar un objeto {nombre: String, autor: String} all array de libros
        this.libros.push({titulo: this.titulo, autor: this.autor})
    }
    getBookNames() {
        //retorna un array con sólo los nombres del array de libros del usuario
        return this.libros.map(libros => libros.titulo)
    }
}

const user1 = new Usuario (
    //nombre
    'Macarena',
    //apellido
    'Asensio',
    //libros
    [
        { titulo: 'Hábitos atómicos', autor: 'James Clear'},
        { titulo: 'El hombre más rico de Babilonia', autor: 'George S. Clason'}
    ],
    //mascotas
    ['Mendieta', 'Kiwi', 'Umi']
)

//Retornos
console.log(user1.getFullName())
console.log(`Tengo ${user1.countMascotas()} mascotas`)
console.log(user1.getBookNames())