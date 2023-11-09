const fs = require('fs') // File System 
const path = require('path') // Modulo que proporciona utilidades para trabajar con rutas de archivos y carpetas
const app = require('./lib/app.js')
// Aqui vivirá mi función mdLinks la cual retornara una promesa
const mdLinks = (filePath, validate = false) => {
  return new Promise((resolve, reject) => {
    //Identifica si la ruta existe (verificar si el archivo existe)
    if (fs.existsSync(filePath)) {
      const absolutePath = app.pathAbsolute(filePath) // Obtiene la ruta absoluta
      const isMarkdownFile = app.isMarkdown(filePath) // Verifica si el archivo es markdown 

      if (isMarkdownFile && absolutePath) { // Cuando tiene la r.Absoluta y verifica la extensión md
        // Lee el contenido del archivo, 'data' es la variable donde se almacena el contenido.
        fs.readFile(filePath, 'utf-8', (err, data) => { // UTF-8 Indica que se debe decodificar el contenido del archivo como texto
          if (err) {
            reject(err)
          } else {
            // 1ero busca cualquier texto entre corchetes(texto del enlace)
            // La parte https busca cualquier URL entre parentesis
            // La 'g' indica que debe ser global, se buscaran todas las coincidencias
            const textRex = /\[([^\]]+)\]\((https?:\/\/[^\s]+)\)/g
            // Busca todas las coincidencias en data que cumplan con las condiciones que establece textRex
            const matches = data.matchAll(textRex)
            // Se crea un nuevo arreglo con los resultados de 'matches'
            // map itera sobre cada elemento del arreglo y crea objeto con las propiedades
            const arrayLinks = Array.from(matches).map(match => ({
              href: match[2],
              text: match[1],
              file: absolutePath,
            }))
            if (validate) {
              // validateLinks valida cada enlace en el arreglo haciendo una solicitud HTTP y devuelve los enlances validados
              app.validateLinks(arrayLinks) // Si 'validate' es true se llama a validateLinks con el argumento 'arrayLinks'
                .then(validatedArray => {
                  resolve(validatedArray)
                })
                .catch(error => {
                  reject(error)
                })
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