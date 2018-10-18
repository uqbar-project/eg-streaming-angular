import * as _ from "lodash"

export abstract class Contenido {
    id: number
    titulo: string = ""
    actores: string[] = []
    calificaciones: number[] = []
    errors: string[] = []

    validar(): void {
        this.errors = []
        if (!this.titulo) {
            this.errors.push("Debe ingresar título")
        }
        this.doValidar()
    }

    get protagonistas(): string {
        return this.actores.join(', ')
    }

    get popularidad(): string {
        if (this.calificaciones.length == 0) return ""
        return _.mean(this.calificaciones).toFixed(2).replace('.', ',')
    }

    esSerie() { return false }

    abstract doValidar(): void
    abstract datosAdicionales(): string

    init(data: any): void {
        this.id = data.id
        this.titulo = data.titulo
        this.actores = data.actores
        this.calificaciones = data.calificaciones
        this.doInit(data)
    }

    copy(): Contenido {
        const clone = Object.assign(this.generateCopy(), JSON.parse(JSON.stringify(this)))
        clone.doCopy(this)
        return clone 
    }

    doCopy(contenido: Contenido): void {}

    existe() {
        return this.id != null && this.id > 0
    }

    tieneErrores() {
        return this.errors.length > 0
    }
    abstract generateCopy(): Contenido
    abstract doInit(data: any): void
    abstract get type(): string
}

export class Serie extends Contenido {
    temporadas: number

    esSerie() { return true }

    datosAdicionales(): string { return "" + this.temporadas + " temporadas" }

    doValidar(): void {
        if (!this.temporadas) {
            this.errors.push("Debe ingresar cantidad de temporadas")
        }
    }

    doInit(data: any) {
        this.temporadas = data.temporadas
    }

    get type() { return "serie" }

    generateCopy(): Contenido {
        return new Serie()
    }
    
}

export class Pelicula extends Contenido {
    fechaRelease: Date = new Date()

    datosAdicionales(): string { 
        if (!this.fechaRelease) return ""
        return "Lanzado en el año " + this.fechaRelease.getUTCFullYear() 
    }

    doValidar(): void {
        if (!this.fechaRelease) {
            this.errors.push("Debe ingresar fecha de salida")
        }
    }

    doInit(data: any) {
        this.fechaRelease = data.fechaRelease
    }

    get type() { return "pelicula" }

    generateCopy(): Contenido {
        return new Pelicula()
    }

    doCopy(contenido: Contenido): void {
        this.fechaRelease = (contenido as Pelicula).fechaRelease
    }

}
