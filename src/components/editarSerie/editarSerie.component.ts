import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core'
import { EditarContenidoComponent } from '../editarContenido/editarContenido.component'
import { Contenido } from '../../domain/contenido';
import { ContenidoService } from '../../services/contenido.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-editarSerie',
  templateUrl: './editarSerie.component.html',
  styleUrls: ['./editarSerie.component.css']
})
export class EditarSerieComponent implements OnInit {
  contenido : Contenido
  alta: boolean = false

  constructor(private contenidoService: ContenidoService, private route: ActivatedRoute) { }
  
  ngOnInit() {
    const paramId = this.route.snapshot.params.id
    this.alta = paramId == 'new'
    if (this.alta) {
      this.contenido = this.contenidoService.getOrCreateContenido(this.route.snapshot.url[0].path) 
    } else {
      this.contenido = this.contenidoService.getContenidoById(paramId)
    }
  }
  
}
