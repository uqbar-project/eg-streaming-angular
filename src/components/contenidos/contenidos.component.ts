import { Component, OnInit } from '@angular/core'
import { ContenidoService } from '../../services/contenido.service'
import { Contenido } from '../../domain/contenido'
import { Router } from '@angular/router'

@Component({
  selector: 'app-contenidos',
  templateUrl: './contenidos.component.html',
  styleUrls: ['./contenidos.component.css']
})
export class ContenidosComponent implements OnInit {

  contenidos!: Contenido[]

  constructor(private contenidoService: ContenidoService, private router: Router) { }

  ngOnInit() {
    this.contenidos = this.contenidoService.contenidos
  }

  eliminar(contenido: Contenido) {
    this.contenidoService.eliminar(contenido)
  }

  nuevaSerie() {
    this.contenidoService.init()
    this.router.navigate(['edit/serie/new'])
  }

  nuevaPelicula() {
    this.contenidoService.init()
    this.router.navigate(['edit/pelicula/new'])
  }

}
