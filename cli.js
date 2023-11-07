//THEN Y CATCH 
const { mdLinks } = require('./index.js')
const app = require('./lib/app.js')
const axios = require('axios')
mdLinks('./example/example.md')
    .then(absolutePath => {
        console.log('La ruta absoluta es:', absolutePath)
        // Realizar la segunda llamada a mdLinks después de que la primera se haya resuelto
        return mdLinks('./example/example.md')
    })
    .then(extension => {
        console.log('El archivo es Markdown', extension)
    })
    .then(validateLinks => {
        console.log(validateLinks)
    })
    .catch((error) => {
        console.error(error)
    })
// Función para validar los links
mdLinks('./example/example.md', true)
.then(links => console.log(links))
.catch(error => console.error(error))