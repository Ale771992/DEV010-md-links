const { pathAbsolute, isMarkdown, validateLinks } = require('../lib/app');

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
        const isMarkdownFile = isMarkdown(filePath)
        expect(isMarkdownFile).toBe(true)
    })
    it('should return false if the file is not Markdown', () => {
        const filePath = './example/example.txt'
        const isMarkdownFile = isMarkdown(filePath)
        expect(isMarkdownFile).toBe(false)
    })
})
test('validateLinks should return the status code and "ok" if it was succesfull', () => {
    // Mockea fetch utilizando jest.fn()
    global.fetch = jest.fn();
    // Configura el mock para devolver una respuesta simulada
    fetch.mockResolvedValue({
        status: 200,
        ok: 'ok',
    });

    // Define los datos de prueba
    const arrayLinks = [
        { href: 'https://example.com/link1' },
        { href: 'https://example.com/link2' },
    ];

    // Llama a la función que deseas probar
    return validateLinks(arrayLinks).then((result) => {
        // Verifica si la función se comportó correctamente según el mock
        expect(result).toEqual([
            { href: 'https://example.com/link1', status: 200, success: 'ok' },
            { href: 'https://example.com/link2', status: 200, success: 'ok' },
        ]);

        // Verifica si fetch fue llamado con los argumentos esperados
        expect(fetch).toHaveBeenCalledTimes(2);
        expect(fetch).toHaveBeenCalledWith('https://example.com/link1');
        expect(fetch).toHaveBeenCalledWith('https://example.com/link2');
    })
})
test('validateLinks should return the status code and "fail" if it was unsuccessfull', () => {
    // Mockea fetch utilizando jest.fn()
    global.fetch = jest.fn();
    // Configura el mock para devolver una respuesta simulada
    fetch.mockRejectedValue({
        status: 404,
        ok: 'fail',
    });

    // Define los datos de prueba
    const arrayLinks = [
        { href: 'https://badexample.com/link1' },
        { href: 'https://badexample.com/link2' },
    ];
    // Llama a la función que deseas probar
    return validateLinks(arrayLinks).catch((result) => {
        // Verifica si la función se comportó correctamente según el mock
        expect(result).toEqual([
            { href: 'https://example.com/link1', status: 404, success: 'fail' },
            { href: 'https://example.com/link2', status: 404, success: 'fail' },
        ]);

        // Verifica si fetch fue llamado con los argumentos esperados
        expect(fetch).toHaveBeenCalledTimes(2);
        expect(fetch).toHaveBeenCalledWith('https://badexample.com/link1');
        expect(fetch).toHaveBeenCalledWith('https://badexample.com/link2');
    })
})