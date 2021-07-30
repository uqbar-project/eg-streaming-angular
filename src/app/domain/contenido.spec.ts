import { Pelicula, Serie } from "./contenido"

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
    it('should return empty average for series with no qualifications', () => {
      expect(new Serie().popularidad).toBe('')
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

  describe('Película spec', () => {
    let pelicula: Pelicula

    beforeEach(() => {
      pelicula = new Pelicula()
      pelicula.fechaRelease = new Date(2001, 1, 1)
      pelicula.titulo = 'Cruella'
      pelicula.id = 10
      pelicula.actores = [ 'Emma Stone', 'Emma Thompson', 'Joel Fry' ]
      pelicula.calificaciones = [ 7, 7, 6, 9, 8, 7, 7]
    })
    it('should return the correct type', () => {
      expect(pelicula.type).toBe('pelicula')
    })
    it('should return the correct label', () => {
      expect(pelicula.label).toBe('Película')
    })
    it('should return the correct additional data', () => {
      expect(pelicula.datosAdicionales()).toBe('Lanzado en el año 2001')
    })
    it('should return the correct average', () => {
      expect(pelicula.popularidad).toBe('7,29')
    })
    it('should return empty average for series with no qualifications', () => {
      expect(new Pelicula().popularidad).toBe('')
    })
    it('should return the correct cast', () => {
      expect(pelicula.protagonistas).toBe('Emma Stone, Emma Thompson, Joel Fry')
    })
    it('should return the correct image', () => {
      expect(pelicula.image()).toBe('/assets/images/peli.png')
    })
    it('should return the correct copy', () => {
      const copy = pelicula.generateCopy()
      expect(copy).toBeInstanceOf(Pelicula)
    })
    it('should detect an existent film', () => {
      expect(pelicula.existe()).toBe(true)
    })
    it('should detect an unexistent film', () => {
      expect(new Pelicula().existe()).toBe(false)
    })
    it('should detect a valid film', () => {
      pelicula.validar()
      expect(pelicula.tieneErrores()).toBe(false)
    })
    it('should detect an invalid film', () => {
      const invalidFilm = new Pelicula()
      invalidFilm.validar()
      expect(invalidFilm.tieneErrores()).toBe(true)
      expect(invalidFilm.errors).toEqual([ 'Debe ingresar título' ])
    })
    it('should make an exact copy', () => {
      const copy = pelicula.copy() as Pelicula
      expect(copy.id).toBe(pelicula.id)
      expect(copy.titulo).toBe(pelicula.titulo)
      expect(copy.fechaRelease).toBe(pelicula.fechaRelease)
      expect(copy.actores).toEqual(pelicula.actores)
      expect(copy.calificaciones).toEqual(pelicula.calificaciones)
      expect(copy.errors).toEqual(pelicula.errors)
    })
  })
})