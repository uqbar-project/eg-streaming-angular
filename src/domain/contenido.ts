export abstract class Contenido {
    id: number
    titulo : string
    actores : string[]
    calificaciones: number[]
    errors: string[] = []

    validar(): void {
        if (!this.titulo) {
            this.errors.push("Debe ingresar título")
        }
        this.doValidar()
    }

    get protagonistas() : string {
        return this.actores.join(', ')
    }

    get popularidad() : string {
        const total = this.calificaciones.reduce((a, b) => a + b)
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

    abstract doInit(data: any): void
    abstract get type(): string
}

export class Serie extends Contenido {
    temporadas: number
    
    esSerie() { return true }
    
    datosAdicionales(): string { return "" + this.temporadas + " temporadas" }

    doValidar(): void {
    }

    doInit(data: any) {
        this.temporadas = data.temporadas
    }

    get type() { return "serie" }
}

export class Pelicula extends Contenido {
    fechaRelease: Date

    datosAdicionales(): string { return "Lanzado en el año " + this.fechaRelease.getUTCFullYear() }

    doValidar(): void {

    }

    doInit(data: any) {
        this.fechaRelease = data.fechaRelease
    }

    get type() { return "pelicula" }
}
