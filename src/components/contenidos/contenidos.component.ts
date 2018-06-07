import { Component, OnInit } from '@angular/core'
import { ContenidoService } from '../../services/contenido.service'
import { Contenido } from '../../domain/contenido'

@Component({
  selector: 'app-contenidos',
  templateUrl: './contenidos.component.html',
  styleUrls: ['./contenidos.component.css']
})
export class ContenidosComponent implements OnInit {

  contenidos: Contenido[]

  constructor(private contenidoService: ContenidoService) { 
    this.contenidos = contenidoService.contenidos
  }

  ngOnInit() {
  }

}
