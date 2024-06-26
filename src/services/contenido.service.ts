import { Injectable } from '@angular/core'
import { Contenido, Pelicula, Serie } from 'domain/contenido'

export type TiposContenido = {
  [key: string]: () => Contenido
}

const tiposContenido: TiposContenido = {
  'serie': () => new Serie(),
  'pelicula': () => new Pelicula()
}

let lastId = 1

const allContenidos = () => [
  insertSerie('Lost', ['Jorge García', 'Josh Holloway', 'Evangeline Lilly'], [4, 8, 2], 6),
  insertPelicula('The Wolf of Wall Street', ['Leonardo Di Caprio', 'Jonah Hill'], [8, 9, 6], 'Martin Scorsese'),
  insertPelicula('Inglorious Basterds', ['Brad Pitt', 'Melanie Laurent', 'Christoph Waltz'], [9, 7], 'Quentin Tarantino'),
  insertSerie('Homeland', ['Claire Danes', 'Mandy Patinkin'], [8, 8, 7, 7, 8], 8),
]

function insertSerie(titulo: string, actores: string[], calificaciones: number[], temporadas: number) {
  return Object.assign(new Serie(), {
    id: lastId++,
    titulo,
    actores,
    calificaciones,
    temporadas,
  })
}

function insertPelicula(titulo: string, actores: string[], calificaciones: number[], director: string) {
  return Object.assign(new Pelicula(), {
    id: lastId++,
    titulo,
    actores,
    calificaciones,
    director,
  })
}

@Injectable({
  providedIn: 'root'
})
export class ContenidoService {

  contenido: Contenido | null = null
  contenidos: Contenido[]

  constructor() {
    this.contenidos = allContenidos()
  }

  updateContenidoById(id: number|string): void {
    this.contenido = this.getContenidoById(id) || null
  }

  getContenidoById(id: number|string): Contenido | undefined {
    return this.contenidos.find((contenido) => contenido.id === Number(id))
  }

  actualizar(contenido: Contenido): void {
    const indice = this.contenidos.findIndex(unContenido => unContenido.id == contenido.id)
    if (indice >= 0) {
      this.contenidos.splice(indice, 1, contenido)
    } else {
      this.crear(contenido)
    }
  }

  eliminar(contenido: Contenido): void {
    // remove(this.contenidos, contenido)
    // según Stack Overflow
    // https://stackoverflow.com/questions/15292278/how-do-i-remove-an-array-item-in-typescript
    const index = this.contenidos.findIndex((elem) => contenido.id == elem.id)
    if (index !== -1) {
      this.contenidos.splice(index, 1)
    } else {
      throw new Error(`Contenido con id ${contenido.id} no se encontró`)
    }
  }

  createContenido(tipoContenido: string): void {
    // En base al string 'serie' busco en el mapa el objeto contenido (una serie)
    this.contenido = tiposContenido[tipoContenido]() || null
    this.contenido.id = lastId++
  }

  crear(contenido: Contenido) {
    this.contenidos.push(contenido)
  }

  init() {
    this.contenido = null
  }

}
