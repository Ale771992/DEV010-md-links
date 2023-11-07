const { mdLinks } = require('../index')
const app = require('../lib/app')
const fs = require('fs')
const path = require('path')

describe('mdLinks', () => {
    it('deberia devolver una promesa', () => {
        const filePath = '../example/example.md'
        expect(mdLinks(filePath)).toBeInstanceOf(Promise)
    })
})