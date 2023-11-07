const path = require('path')
const fs = require('fs')
const { resolve } = require('path')
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
// Función para validar los links
const validateLinks = (links) => {
    return Promise.all(
        links.map((link) => {
            return fetch(link.href)
                .then((response) => {
                    link.status = response.status
                    link.ok = response.ok ? 'ok' : 'fail'
                    return link
                })
                .catch(() => {
                    link.status = 500
                    link.ok = 'fail'
                    return link
                })
        })
    )
}

module.exports = {
    pathAbsolute,
    isMarkdown,
    validateLinks
};
