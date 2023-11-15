#!/usr/bin/env node
// En el archivo cli.js se implementa la lógica para interactuar con el usuario
const { mdLinks } = require('./index.js')
const app = require('./lib/app.js')
const [, , ...args] = process.argv

const validate = args.includes('--validate')
const stats = args.includes('--stats')

if (stats && validate) {
    mdLinks(args[0], validate)
        .then((result) => {
            if (!result || !result.length) {
                throw new Error('Invalid result')
            }
            const totalLinks = result.length
            const linkUnique = [...new Set(result.map(link => link.href))]
            const totalLinksFail = result.filter(link => link.status >= 400)

            const unique = linkUnique.length
            const linkFail = totalLinksFail.length

            console.log(`total: ${totalLinks}`);
            console.log(`unique: ${unique}`);
            console.log(`broken: ${linkFail}`);
        })
        .catch((error) => {
            console.error('Error', error.message);
        });
} else if (stats) {
    mdLinks(args[0])
        .then((result) => {
            const totalLinks = result.length;
            const linkUnique = [...new Set(result.map(link => link.href))];
            const unique = linkUnique.length;

            console.log(`total: ${totalLinks}`);
            console.log(`unique: ${unique}`);
        })
        .catch((error) => {
            console.error('Error', error.message);
        });
} else if (validate) {
    args.splice(args.indexOf('--validate'), 1);
    mdLinks(args[0], true)
        .then((result) => {
            const formattedLinks = result.map(link => `${link.file} ${link.href} ${link.status} ${link.text}`);
            console.log(formattedLinks.join('\n'));
        })
        .catch((error) => {
            console.error(error);
        });
} else {
    mdLinks(args[0], false)
        .then((result) => {
            const formattedLinks = result.map(link => `${link.file} ${link.href} ${link.text}`);
            console.log(formattedLinks.join('\n'));
        })
        .catch((error) => {
            console.error(error);
        });
}






// HITO 1 Y 2
//THEN Y CATCH 
/*mdLinks(filePath, {validate: validateOption})
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
mdLinks('./example/example.md',{validate: validateOption} )
    .then(links => console.log(links))
    .catch(error => console.error(error))

module.exports*/