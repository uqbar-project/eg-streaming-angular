import { Injectable } from '@angular/core'

import { Contenido, Pelicula, Serie } from '../domain/contenido'

export type TiposContenido = {
  [key: string]: () => Contenido
} 

const tiposContenido: TiposContenido = {
  'serie': () => new Serie(),
  'pelicula': () => new Pelicula()
}

@Injectable({
  providedIn: 'root'
})
export class ContenidoService {

  constructor() {
    this.insertSerie('Lost', ['Jorge García', 'Josh Holloway', 'Evangeline Lilly'], [4, 8, 2], 6)
    this.insertPelicula('The Wolf of Wall Street', ['Leonardo Di Caprio', 'Jonah Hill'], [8, 9, 6], new Date(2013, 11, 23))
    this.insertPelicula('Inglorious Basterds', ['Brad Pitt', 'Melanie Laurent', 'Christoph Waltz'], [9, 7], new Date(2009, 7, 21))
    this.insertSerie('Homeland', ['Claire Danes', 'Mandy Patinkin'], [8, 8, 7, 7, 8], 8)
  }
  static lastId = 0

  contenido: Contenido | null = null
  contenidos: Contenido[] = []

  insertSerie(titulo: string, actores: string[], calificaciones: number[], temporadas: number) {
    const serie = Object.assign(new Serie(), {
      id: this.lastId(),
      titulo,
      actores,
      calificaciones,
      temporadas,
    })
    this.contenidos.push(serie)
  }

  insertPelicula(titulo: string, actores: string[], calificaciones: number[], fechaRelease: Date) {
    const peli = Object.assign(new Pelicula(), {
      id: this.lastId(),
      titulo,
      actores,
      calificaciones,
      fechaRelease,
    })
    this.contenidos.push(peli)
  }

  lastId(): number {
    ContenidoService.lastId = ContenidoService.lastId + 1
    return ContenidoService.lastId
  }

  updateContenidoById(id: string): void {
    this.contenido = this.contenidos.find((contenido) => contenido.id === Number(id)) || null
  }

  actualizar(contenido: Contenido): void {
    console.log('contenido existe', contenido.existe(), contenido)
    if (contenido.existe()) {
      this.eliminar(contenido)
    }
    this.crear(contenido)
  }

  eliminar(contenido: Contenido): void {
    // remove(this.contenidos, contenido)
    // según Stack Overflow
    // https://stackoverflow.com/questions/15292278/how-do-i-remove-an-array-item-in-typescript
    const index = this.contenidos.findIndex((elem) => contenido.id == elem.id)
    if (index !== -1) {
      this.contenidos.splice(index, 1)
    }
  }

  createContenido(tipoContenido: string): void {
    // En base al string 'serie' busco en el mapa el objeto contenido (una serie)
    this.contenido = tiposContenido[tipoContenido]() || null
    this.contenido.id = this.lastId()
  }

  crear(contenido: Contenido) {
    this.contenidos.push(contenido)
  }

  init() {
    this.contenido = null
  }

}
