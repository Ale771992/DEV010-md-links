const { mdLinks } = require('../');


describe('mdLinks', () => {

  it('should...', () => {
    console.log('FIX ME!');
  });
  it('deberia devolver una promesa', () => {
    expect(mdLinks()).toBe(typeof Promise)
  })
  test('deberia rechazar la promesa si la ruta no existe', () => {
    return mdLinks('alejandra/noexiste.md').catch((error) => {
expect(error).toBe('La ruta no existe')
    })
  })
})