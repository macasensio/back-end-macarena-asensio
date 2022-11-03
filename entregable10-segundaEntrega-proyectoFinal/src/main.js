import app from './server.js'

const PORT = 9000
const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})
server.on('error', error => console.log(`Error en el servidor: ${error} `))