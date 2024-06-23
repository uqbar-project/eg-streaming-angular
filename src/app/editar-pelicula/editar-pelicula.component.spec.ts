import { ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing'

import { EditarPeliculaComponent } from './editar-pelicula.component'
import { ActivatedRoute, RouterModule } from '@angular/router'
import { ContenidoService } from 'services/contenido.service'
import { Pelicula } from 'domain/contenido'
import { getByDataTestId } from 'testUtils'

describe('EditarPeliculaComponent', () => {
  let fixture: ComponentFixture<EditarPeliculaComponent>
  let contenidoService: ContenidoService
  let pelicula: Pelicula

  beforeEach(async () => {
    contenidoService = new ContenidoService()
    pelicula = contenidoService.contenidos.filter((serie) => serie.type === 'pelicula')[0] as Pelicula
    contenidoService.contenido = pelicula
    
    await TestBed.configureTestingModule({
      imports: [EditarPeliculaComponent, RouterModule.forRoot([])],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              params: { 'id': pelicula.id },
            }
          }
        },
        { provide: ContenidoService, useValue: contenidoService },
      ],
    }).compileComponents()

    fixture = TestBed.createComponent(EditarPeliculaComponent)
    fixture.detectChanges()
  })

  it('release date is shown', fakeAsync(() => {
    const director = getByDataTestId(fixture, 'director').value
    expect(director).toBe(pelicula.director)
  }))

})
