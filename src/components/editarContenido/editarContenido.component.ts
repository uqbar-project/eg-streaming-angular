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

  contenido: Contenido = new Serie()

  constructor(private router: Router, private route: ActivatedRoute, private contenidoService: ContenidoService) { }

  ngOnInit() {
    const paramId = this.route.firstChild.snapshot.params.id
    this.contenido = this.contenidoService.getContenidoById(paramId)
  }

}
