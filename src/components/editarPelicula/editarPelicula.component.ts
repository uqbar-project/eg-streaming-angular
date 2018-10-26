import { Component, OnInit } from '@angular/core'
import { Pelicula } from '../../domain/contenido'
import { ActivatedRoute } from '@angular/router'
import { ContenidoService } from '../../services/contenido.service'

@Component({
  selector: 'app-editarPelicula',
  templateUrl: './editarPelicula.component.html',
  styleUrls: ['./editarPelicula.component.css']
})
export class EditarPeliculaComponent implements OnInit {

  contenido : Pelicula
  opcionesFecha = {}
  fechaReleaseModel = {}

  constructor(private contenidoService: ContenidoService, private route: ActivatedRoute) { }

  ngOnInit() {
    const paramId = this.route.snapshot.params.id
    const alta = paramId == 'new'
    if (alta) {
      this.contenido = this.contenidoService.getOrCreateContenido(this.route.snapshot.url[0].path) as Pelicula
    } else {
      this.contenido = this.contenidoService.getContenidoById(paramId) as Pelicula
    }

    this.opcionesFecha = {
      dateFormat: 'dd/mm/yyyy'
    }
    this.fechaReleaseModel = {
      date: this.convertirANuevoDate(this.contenido.fechaRelease)
    }
  }

  actualizarFecha() {
    this.contenido.fechaRelease = this.convertirADate(this.fechaReleaseModel['date'])
  }

  convertirADate(fecha: any): Date {
    if (!fecha) return null
    return new Date(fecha.year, fecha.month - 1, fecha.day)
  }

  convertirANuevoDate(fecha: Date) {
    if (fecha == null) return null
    return {
      year: fecha.getFullYear(),
      month: fecha.getMonth() + 1,
      day: fecha.getDate()
    }
  } 

}
