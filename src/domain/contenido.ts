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
        const total = this.calificaciones.reduce((a, b) => a + b, 0)
        return (total / this.calificaciones.length).toFixed(2).replace('.', ',')
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
        const result = this.generateCopy()
        result.titulo = this.titulo
        result.id = this.id
        result.actores = this.actores.slice()
        result.calificaciones = this.calificaciones.slice()
        this.doCopy(result)
        return result
    }

    abstract doCopy(result) : void

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
    
    doCopy(result) {
        result.temporadas = this.temporadas
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

    doCopy(result) {
        result.fechaRelease = this.fechaRelease
    }
}
