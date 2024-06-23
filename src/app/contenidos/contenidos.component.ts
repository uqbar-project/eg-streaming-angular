import { Component, OnInit } from '@angular/core'
import { Router, RouterLink } from '@angular/router'
import { Contenido } from 'domain/contenido'
import { ContenidoService } from 'services/contenido.service'

@Component({
  selector: 'app-contenidos',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './contenidos.component.html',
  styleUrl: './contenidos.component.css'
})
export class ContenidosComponent implements OnInit {
  contenidos!: Contenido[]

  constructor(
    private contenidoService: ContenidoService,
    private router: Router
  ) {}

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
