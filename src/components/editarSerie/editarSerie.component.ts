import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'

import { Contenido } from '../../domain/contenido'
import { ContenidoService } from '../../services/contenido.service'

@Component({
  selector: 'app-editarSerie',
  templateUrl: './editarSerie.component.html',
  styleUrls: ['./editarSerie.component.css']
})
export class EditarSerieComponent implements OnInit {
  contenido: Contenido

  constructor(private contenidoService: ContenidoService, private route: ActivatedRoute) { }

  ngOnInit() {
    console.log('ngOnInit - Serie')
    this.contenido = this.contenidoService.contenido
  }

}
