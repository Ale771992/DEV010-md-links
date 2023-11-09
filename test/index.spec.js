const { mdLinks } = require('../index')
const app = require('../lib/app')
const fs = require('fs')
const path = require('path')

describe('mdLinks', () => {
    it('should return a promise', () => {
        const filePath = '../example/example.md'
        expect(mdLinks(filePath)).toBeInstanceOf(Promise)
    })
    it('should read the file and return an array with objetcs', () => {
        const filePath = '/Users/alejandrarivera/Desktop/DEV010-md-links/example/example.md'
        
    })
})
