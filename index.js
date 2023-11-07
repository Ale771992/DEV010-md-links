const { fail } = require('assert')
const fs = require('fs')
const path = require('path')
const app = require('./lib/app.js')
// Aqui vivirá mi función mdLinks la cual retornara una promesa
const mdLinks = (filePath, validate = false) => {
  return new Promise((resolve, reject) => {
    //Identifica si la ruta existe (verificar si el archivo existe)
    if (fs.existsSync(filePath)) {
      const absolutePath = app.pathAbsolute(filePath) // obtiene la ruta absoluta
      const isMarkdownFile = app.isMarkdown(filePath) //Verifica si el archivo es markdown 

      if (isMarkdownFile && absolutePath) {
        fs.readFile(filePath, 'utf-8', (err, data) => {
          if (err) {
            reject(err)
          } else {
            const textRex = /\[([^\]]+)\]\((https?:\/\/[^\s]+)\)/g
            const matches = data.matchAll(textRex)
            const arrayLinks = Array.from(matches).map(match => ({
              href: match[2],
              text: match[1],
              file: absolutePath,
            }))
            if(validate){
            app.validateLinks(arrayLinks)
              .then(validatedArray => {
                resolve(validatedArray)
              })
              .catch(error => {
                reject(error)
              })
            } else {
              resolve(arrayLinks)
            }
          }
        })
      } else {
        resolve([])
      }
    } 
  })
}
module.exports.mdLinks = mdLinks;