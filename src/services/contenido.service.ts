import { Injectable } from '@angular/core';
import { Contenido, Serie, Pelicula } from '../domain/contenido'

@Injectable({
  providedIn: 'root'
})
export class ContenidoService {

  contenido : Contenido
  contenidos: Contenido[] = []
  static lastId : number = 0

  constructor() {
    this.insertSerie("Lost", ['Jorge García', 'Josh Holloway', 'Evangeline Lilly'], [4, 8, 2], 6)
    this.insertPelicula("The Wolf of Wall Street", ['Leonardo Di Caprio', 'Jonah Hill'], [8, 9, 6], new Date(2013,11,23))
    this.insertPelicula("Inglorious Basterds", ['Brad Pitt', 'Melanie Laurent', 'Christoph Waltz'], [9, 7], new Date(2009,7,21))
    this.insertSerie("Homeland", ['Claire Danes', 'Mandy Patinkin'], [8, 8, 7, 7, 8], 8)
  }

  insertSerie(titulo: string, actores: string[], calificaciones: number[], temporadas: number) {
    const serie = new Serie()
    serie.init({
      id: this.lastId(),
      titulo: titulo,
      actores: actores,
      calificaciones: calificaciones,
      temporadas: temporadas
    })
    this.contenidos.push(serie)
  }

  insertPelicula(titulo: string, actores: string[], calificaciones: number[], fechaRelease: Date) {
    const peli = new Pelicula()
    peli.init({
      id: this.lastId(),
      titulo: titulo,
      actores: actores,
      calificaciones: calificaciones,
      fechaRelease: fechaRelease
    })
    this.contenidos.push(peli)
  }

  lastId(): number {
    ContenidoService.lastId = ContenidoService.lastId + 1
    return ContenidoService.lastId
  }

  getContenidoById(id: number): Contenido {
    return this.contenidos.find((contenido) => contenido.id == id)
  }

  actualizar(contenido: Contenido): void {
    if (contenido.existe()) {
      this.eliminar(contenido)
    }
    this.crear(contenido)
  }

  eliminar(contenido: Contenido): void {
    const index = this.contenidos.findIndex((elem) => contenido.id == elem.id)
    if (index != -1) {
      this.contenidos.splice(index, 1)
    }
  }

  getOrCreateContenido(tipoContenido: string) {
    if (!this.contenido) {
      // Malo recibir el string, pero está difícil pasarle un nuevo objeto en cada caso
      if (tipoContenido == 'serie') {
        this.contenido = new Serie()
      } else {
        this.contenido = new Pelicula()
      }
      this.contenido.id = this.lastId()
    }
    return this.contenido
  }

  crear(contenido: Contenido) {
    this.contenidos.push(contenido)
  }

  init() {
    this.contenido = null
  }

}