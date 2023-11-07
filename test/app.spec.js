const { pathAbsolute, isMarkdown } = require('../lib/app');

describe('pathAboslute', () => {
    it('Should return an absolute path', () => {
        const filePath = './example/example.md'
        const absolutePath = pathAbsolute(filePath)
        expect(absolutePath).toBe('/Users/alejandrarivera/Desktop/DEV010-md-links/example/example.md')
    })
})
describe('isMarkdown', () => {
    it('should return true if the file is Markdown', () => {
        const filePath = './example/example.md'
        const  isMarkdownFile = isMarkdown(filePath)
        expect(isMarkdownFile).toBe(true)
    })
    it('should return false if the file is not Markdown', () => {
        const filePath = './example/example.txt'
        const isMarkdownFile = isMarkdown(filePath)
        expect(isMarkdownFile).toBe(false)
    })
})