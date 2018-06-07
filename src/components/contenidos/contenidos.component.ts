import { Component, OnInit } from '@angular/core'
import { ContenidoService } from '../../services/contenido.service'
import { Contenido } from '../../domain/contenido'
import { Router } from '@angular/router';

@Component({
  selector: 'app-contenidos',
  templateUrl: './contenidos.component.html',
  styleUrls: ['./contenidos.component.css']
})
export class ContenidosComponent implements OnInit {

  contenidos: Contenido[]

  constructor(private contenidoService: ContenidoService, private router: Router) { 
    this.contenidos = contenidoService.contenidos
  }

  ngOnInit() {
  }

  nuevaSerie() {
    this.router.navigate(['edit/serie/new'])
  }

  nuevaPelicula() {
    this.router.navigate(['edit/pelicula/new'])
  }

}
