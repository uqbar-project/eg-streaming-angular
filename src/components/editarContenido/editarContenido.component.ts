import { Component, OnInit } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { Contenido, Serie } from '../../domain/contenido'
import { ContenidoService } from '../../services/contenido.service'

@Component({
  selector: 'app-editarContenido',
  templateUrl: './editarContenido.component.html',
  styleUrls: ['./editarContenido.component.css']
})
export class EditarContenidoComponent implements OnInit {

  contenido: Contenido
  contenidoOld: Contenido
  alta : boolean = false

  constructor(private router: Router, private route: ActivatedRoute, private contenidoService: ContenidoService) { }

  ngOnInit() {
    const paramId = this.route.firstChild.snapshot.params.id
    this.alta = paramId == 'new'
    if (this.alta) {
      this.contenido = this.contenidoService.getOrCreateContenido(this.route.firstChild.snapshot.url[0].path) 
    } else {
      this.contenido = this.contenidoService.getContenidoById(paramId)
    }
    this.contenidoOld = this.contenido.copy()
  }

  guardar(): void {
    this.contenido.validar()
    if (!this.contenido.tieneErrores()) {
      if (this.alta) {
        this.contenidoService.crear(this.contenido)
      } else {
        this.contenidoService.actualizar(this.contenido)
      }
      this.navegarAHome()
    }
  }

  cancelar(): void {
    this.contenidoService.cancelarCarga()
    if (!this.alta) {
      this.contenidoService.actualizar(this.contenidoOld)
    }
    this.navegarAHome()
  }

  navegarAHome(): void {
    this.router.navigate(['/list'])
  }
}
