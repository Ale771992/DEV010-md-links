const fs = require('fs')
const path = require('path')
const app = require('./lib/app.js')
// Aqui vivirá mi función mdLinks la cual retornara una promesa
const mdLinks = (filePath, options) => {
  return new Promise((resolve, reject) => {
    //Identifica si la ruta existe (verificar si el archivo existe)
    if (fs.existsSync(filePath)) {
      const absolutePath = app.pathAbsolute(filePath) // obtiene la ruta absoluta
      const isMarkdownFile = app.isMarkdown(filePath) //Verifica si el archivo es markdown 
      if (isMarkdownFile)
        fs.readFile(filePath, 'utf-8', (err, data) => {
          if (err) {
            reject(err)
          } else {
            const urlRex = /https?:\/\/[^\s]+/g
            const links = data.match(urlRex)
            // Crear un arreglo de objetos con las propiedades href, text y file
            const arrayLinks = links.map((link) => ({
              href: link,
              text: '',
              file: absolutePath
            }))
            resolve(arrayLinks)
            console.log(links)
          }
        })
    } else {
      reject(new Error('El archivo no existe'))
    }
  })
}
module.exports = {
  mdLinks
};