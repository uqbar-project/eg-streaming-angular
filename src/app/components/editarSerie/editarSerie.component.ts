import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'

import { Serie } from '../../domain/contenido'
import { ContenidoService } from '../../services/contenido.service'

@Component({
  selector: 'app-editarSerie',
  templateUrl: './editarSerie.component.html',
  styleUrls: ['./editarSerie.component.css']
})
export class EditarSerieComponent implements OnInit {
  contenido!: Serie

  constructor(private contenidoService: ContenidoService, private route: ActivatedRoute) {
    console.log('constructor - EditarSerie', this.contenido)
  }

  ngOnInit() {
    console.log('ngOnInit - Serie', this.contenidoService.contenido)
    this.contenido = this.contenidoService.contenido as Serie
  }

}
