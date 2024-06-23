import { Component, OnInit } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { ActivatedRoute } from '@angular/router'
import { Pelicula } from 'domain/contenido'
import { ContenidoService } from 'services/contenido.service'

@Component({
  selector: 'app-editar-pelicula',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './editar-pelicula.component.html',
  styleUrl: './editar-pelicula.component.css'
})
export class EditarPeliculaComponent implements OnInit {
  contenido!: Pelicula
  fechaReleaseModel = {}

  constructor(
    private contenidoService: ContenidoService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.contenido = this.contenidoService.contenido as Pelicula
  }
}
