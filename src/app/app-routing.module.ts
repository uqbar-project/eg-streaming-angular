import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { ContenidosComponent } from '../components/contenidos/contenidos.component'
import { EditarContenidoComponent } from '../components/editarContenido/editarContenido.component'
import { EditarSerieComponent } from '../components/editarSerie/editarSerie.component'
import { EditarPeliculaComponent } from '../components/editarPelicula/editarPelicula.component'

const routes: Routes = [
  { path: '', redirectTo: '/list', pathMatch: 'full' },
  { path: 'list', component: ContenidosComponent },
  {
    path: 'edit', component: EditarContenidoComponent, children: [
      { path: 'serie/:id', component: EditarSerieComponent },
      { path: 'pelicula/:id', component: EditarPeliculaComponent }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routingComponents = [ContenidosComponent, EditarContenidoComponent, EditarSerieComponent, EditarPeliculaComponent]