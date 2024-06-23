import { Component } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { ActivatedRoute } from '@angular/router'
import { Serie } from 'domain/contenido'
import { ContenidoService } from 'services/contenido.service'

@Component({
  selector: 'app-editar-serie',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './editar-serie.component.html',
  styleUrl: './editar-serie.component.css'
})
export class EditarSerieComponent {
  contenido!: Serie

  constructor(
    private contenidoService: ContenidoService,
    private route: ActivatedRoute
  ) {
    console.info('constructor - EditarSerie', this.contenido)
  }

  ngOnInit() {
    console.info('ngOnInit - Serie', this.contenidoService.contenido)
    this.contenido = this.contenidoService.contenido as Serie
  }
}
