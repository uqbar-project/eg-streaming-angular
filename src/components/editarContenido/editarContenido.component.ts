import { Component, OnInit } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { Contenido } from '../../domain/contenido'
import { ContenidoService } from '../../services/contenido.service'

@Component({
  selector: 'app-editarContenido',
  templateUrl: './editarContenido.component.html',
  styleUrls: ['./editarContenido.component.css']
})
export class EditarContenidoComponent implements OnInit {

  contenido: Contenido
  contenidoOld: Contenido
  alta = false

  constructor(private router: Router, private route: ActivatedRoute, private contenidoService: ContenidoService) {
    this.contenidoService.init()
  }

  ngOnInit() {
    const paramId = this.route.firstChild.snapshot.params.id
    this.alta = paramId === 'new'
    console.log('ngOnInit de Editar Contenido Component')
    if (this.alta) {
      this.contenido = this.contenidoService.getOrCreateContenido(this.route.firstChild.snapshot.url[0].path)
    } else {
      this.contenido = this.contenidoService.getContenidoById(paramId)
    }
    console.log('contenido', this.contenido)
    this.contenidoOld = this.contenido.copy()
  }

  guardar(): void {
    this.contenido.validar()
    if (!this.contenido.tieneErrores()) {
      this.contenidoService.actualizar(this.contenido)
      this.navegarAHome()
    }
  }

  cancelar(): void {
    if (!this.alta) {
      this.contenidoService.actualizar(this.contenidoOld)
    }
    this.navegarAHome()
  }

  navegarAHome(): void {
    this.router.navigate(['/list'])
  }
}
