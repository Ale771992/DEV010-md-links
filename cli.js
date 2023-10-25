//THEN Y CATCH 
const { mdLinks } = require('./index.js')
mdLinks('./example/example.md')
    .then(absolutePath => {
        console.log('La ruta absoluta es:', absolutePath)
        console.log()
    })
    .catch((error) => {
        console.error(error)
    })
mdLinks('./example/example.md')
    .then(extension => {
        console.log('El archivo es Markdown', extension)
    })
    .catch((error) => {
        console.error(error)
    })

