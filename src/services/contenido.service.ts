import { Injectable } from '@angular/core';
import { Contenido, Serie, Pelicula } from '../domain/contenido'

@Injectable({
  providedIn: 'root'
})
export class ContenidoService {

  contenidos: Contenido[] = []

  constructor() {
    this.insertSerie("Lost", ['Jorge García', 'Josh Holloway', 'Evangeline Lilly'], [4, 8, 2], 6)
    this.insertPelicula("The Wolf of Wall Street", ['Leonardo Di Caprio', 'Jonah Hill'], [8, 9, 6], new Date(2013,12,23))
    this.insertPelicula("Inglorious Basterds", ['Brad Pitt', 'Melanie Laurent', 'Christoph Waltz'], [9, 7], new Date(2009,8,21))
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
    return this.contenidos.length + 1
  }

  getContenidoById(id: number): Contenido {
    return this.contenidos.find((contenido) => contenido.id == id)
  }
}