import { Routes } from '@angular/router'
import { ContenidosComponent } from './contenidos/contenidos.component'
import { EditarContenidoComponent } from './editar-contenido/editar-contenido.component'
import { EditarSerieComponent } from './editar-serie/editar-serie.component'
import { EditarPeliculaComponent } from './editar-pelicula/editar-pelicula.component'

export const routes: Routes = [
  { path: '', redirectTo: '/list', pathMatch: 'full' },
  { path: 'list', component: ContenidosComponent },
  {
    path: 'edit', component: EditarContenidoComponent, children: [
      { path: 'serie/:id', component: EditarSerieComponent },
      { path: 'pelicula/:id', component: EditarPeliculaComponent }
    ]
  }
]

