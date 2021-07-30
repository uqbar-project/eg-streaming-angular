import { Serie } from "./contenido"

describe('Contenido domain specs', () => {
  describe('Serie spec', () => {
    let serie: Serie

    beforeEach(() => {
      serie = new Serie()
      serie.temporadas = 7
      serie.titulo = 'Mad Men'
      serie.id = 10
      serie.actores = [ 'Jon Hamm', 'Christina Hendricks', 'January Jones', 'Elisabeth Moss', 'John Slattery']
      serie.calificaciones = [ 10, 8, 8, 10, 10, 9, 9, 9, 10, 10 ]
    })
    it('should return the correct type', () => {
      expect(serie.type).toBe('serie')
    })
    it('should return the correct label', () => {
      expect(serie.label).toBe('Serie')
    })
    it('should return the correct additional data', () => {
      expect(serie.datosAdicionales()).toBe('7 temporadas')
    })
    it('should return the correct average', () => {
      expect(serie.popularidad).toBe('9,30')
    })
    it('should return the correct cast', () => {
      expect(serie.protagonistas).toBe('Jon Hamm, Christina Hendricks, January Jones, Elisabeth Moss, John Slattery')
    })
    it('should return the correct image', () => {
      expect(serie.image()).toBe('/assets/images/serie.gif')
    })
    it('should return the correct copy', () => {
      const copy = serie.generateCopy()
      expect(copy).toBeInstanceOf(Serie)
    })
    it('should detect an existent serie', () => {
      expect(serie.existe()).toBe(true)
    })
    it('should detect an unexistent serie', () => {
      expect(new Serie().existe()).toBe(false)
    })
    it('should detect a valid serie', () => {
      serie.validar()
      expect(serie.tieneErrores()).toBe(false)
    })
    it('should detect an invalid serie', () => {
      const invalidSerie = new Serie()
      invalidSerie.validar()
      expect(invalidSerie.tieneErrores()).toBe(true)
      expect(invalidSerie.errors).toEqual([ 'Debe ingresar título', 'Debe ingresar cantidad de temporadas' ])
    })
    it('should make an exact copy', () => {
      const copy = serie.copy() as Serie
      expect(copy.id).toBe(serie.id)
      expect(copy.titulo).toBe(serie.titulo)
      expect(copy.temporadas).toBe(serie.temporadas)
      expect(copy.actores).toEqual(serie.actores)
      expect(copy.calificaciones).toEqual(serie.calificaciones)
      expect(copy.errors).toEqual(serie.errors)
    })
  })
})