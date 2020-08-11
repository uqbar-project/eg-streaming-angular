import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { faCalendar, faCalendarTimes } from '@fortawesome/free-solid-svg-icons'
import { IAngularMyDpOptions } from 'angular-mydatepicker'

import { Pelicula } from '../../domain/contenido'
import { ContenidoService } from '../../services/contenido.service'

@Component({
  selector: 'app-editarPelicula',
  templateUrl: './editarPelicula.component.html',
  styleUrls: ['./editarPelicula.component.css']
})
export class EditarPeliculaComponent implements OnInit {

  faCalendar = faCalendar
  faCalendarTimes = faCalendarTimes
  contenido: Pelicula
  opcionesFecha: IAngularMyDpOptions
  fechaReleaseModel = {}

  constructor(private contenidoService: ContenidoService, private route: ActivatedRoute) { }

  ngOnInit() {
    console.log('ngOnInit de Editar Pelicula Component')
    const paramId = this.route.snapshot.params.id
    const alta = paramId === 'new'
    if (alta) {
      this.contenido = this.contenidoService.getOrCreateContenido(this.route.snapshot.url[0].path) as Pelicula
    } else {
      this.contenido = this.contenidoService.getContenidoById(paramId) as Pelicula
    }
    console.log('this.contenido', this.contenido)

    this.fechaReleaseModel = {
      isRange: false,
      singleDate: {
        date: this.convertirANuevoDate(this.contenido.fechaRelease),
      },
    }
    this.opcionesFecha = {
      dateFormat: 'dd/mm/yyyy',
    }
  }

  convertirADate(event: any): void {
    this.contenido.fechaRelease = event.singleDate.jsDate
  }

  convertirANuevoDate(fecha: Date) {
    if (fecha == null) { return null }
    return {
      year: fecha.getFullYear(),
      month: fecha.getMonth() + 1,
      day: fecha.getDate()
    }
  }

}
