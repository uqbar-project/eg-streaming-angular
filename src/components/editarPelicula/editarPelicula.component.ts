import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { faCalendar, faCalendarTimes } from '@fortawesome/free-solid-svg-icons'
import { IAngularMyDpOptions, IMyDateModel } from 'angular-mydatepicker'

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
  contenido!: Pelicula
  opcionesFecha!: IAngularMyDpOptions
  fechaReleaseModel = {}

  constructor(private contenidoService: ContenidoService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.contenido = this.contenidoService.contenido as Pelicula

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

  convertirADate(event: IMyDateModel): void {
    if (!!event.singleDate?.jsDate) {
      this.contenido.fechaRelease = event.singleDate?.jsDate
    }
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
