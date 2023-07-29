import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'

import { Pelicula } from '../../domain/contenido'
import { ContenidoService } from '../../services/contenido.service'

@Component({
  selector: 'app-editarPelicula',
  templateUrl: './editarPelicula.component.html',
  styleUrls: ['./editarPelicula.component.css']
})
export class EditarPeliculaComponent implements OnInit {

  contenido!: Pelicula
  fechaReleaseModel = {}

  constructor(private contenidoService: ContenidoService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.contenido = this.contenidoService.contenido as Pelicula
  }

}
