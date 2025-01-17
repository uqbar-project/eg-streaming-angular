import { isEmpty, mean } from 'lodash'

export const ASSET_FOLDER = '/assets/images/'

export abstract class Contenido {
    id?: number
    titulo = ''
    actores: string[] = []
    calificaciones: number[] = []
    errors: string[] = []

    validar(): void {
        this.errors = []
        if (!this.titulo) {
            this.errors.push('Debe ingresar título')
        }
        this.doValidar()
    }

    get protagonistas(): string {
        return this.actores.join(', ')
    }

    get popularidad(): string {
        if (isEmpty(this.calificaciones)) {
            return ''
        }
        return mean(this.calificaciones).toFixed(2).replace('.', ',')
    }

    abstract get label(): string
    abstract image(): string
    abstract doValidar(): void
    abstract datosAdicionales(): string

    copy(): Contenido {
        return Object.assign(this.generateCopy(), structuredClone(this))
    }

    existe() {
        return this.id != null && this.id > 0
    }

    tieneErrores() {
        return this.errors.length > 0
    }
    abstract generateCopy(): Contenido
    abstract get type(): string
}

export class Serie extends Contenido {
    temporadas!: number

    get label() {
        return 'Serie'
    }

    datosAdicionales(): string { return '' + this.temporadas + ' temporadas' }

    doValidar(): void {
        if (!this.temporadas) {
            this.errors.push('Debe ingresar cantidad de temporadas')
        }
    }

    image() {
        return ASSET_FOLDER + 'tv-solid.svg'
    }

    get type() { return 'serie' }

    generateCopy(): Contenido {
        return new Serie()
    }

}

export class Pelicula extends Contenido {
    director = ''

    get label() {
        return 'Película'
    }

    image() {
        return ASSET_FOLDER + 'film-solid.svg'
    }

    datosAdicionales(): string {
        return this.director ? 'dirigida por ' + this.director : ''
    }

    doValidar(): void {
        if (!this.director) {
            this.errors.push('Debe ingresar la persona que dirigió la película')
        }
    }

    get type() { return 'pelicula' }

    generateCopy(): Contenido {
        return new Pelicula()
    }

}
