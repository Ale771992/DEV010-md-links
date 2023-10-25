const path = require('path')
const fs = require('fs')
// No es necesario verificar si la ruta ya es absoluta antes de llamar a path.resolve(). 
// Tu función pathAbsolute simplemente toma una ruta y devuelve su equivalente en formato absoluto.
const pathAbsolute = (filePath) => {
    // Convierte la ruta en absoluta 
    const absolutePath = path.resolve(filePath)
    return absolutePath;
}
// Función para validar si es markdown
const isMarkdown = (filePath) => {
    const markdownIs = ['.md', '.mkd', '.mdwn', '.mdown', '.mdtxt', '.mdtext', '.markdown', '.text']
    const extension = path.extname(filePath)
    return markdownIs.includes(extension)
}


module.exports = {
    pathAbsolute,
    isMarkdown
};
