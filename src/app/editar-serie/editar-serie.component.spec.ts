import { ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing'

import { EditarSerieComponent } from './editar-serie.component'
import { ActivatedRoute, RouterModule } from '@angular/router'
import { ContenidoService } from 'services/contenido.service'
import { Serie } from 'domain/contenido'
import { getByDataTestId } from 'testUtils'

describe('EditarSerieComponent', () => {
  let fixture: ComponentFixture<EditarSerieComponent>
  let contenidoService: ContenidoService
  let serie: Serie

  beforeEach(async () => {
    contenidoService = new ContenidoService()
    serie = contenidoService.contenidos.filter((serie) => serie.type === 'serie')[0] as Serie
    contenidoService.contenido = serie

    await TestBed.configureTestingModule({
      imports: [EditarSerieComponent, RouterModule.forRoot([])],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              params: { 'id': serie.id },
            }
          }
        },
        { provide: ContenidoService, useValue: contenidoService },
      ],
    }).compileComponents()

    fixture = TestBed.createComponent(EditarSerieComponent)
    fixture.detectChanges()
  })

  it('season length is shown', fakeAsync(() => {
    const cantidadTemporadas = getByDataTestId(fixture, 'cantidadTemporadas').value
    expect(Number(cantidadTemporadas)).toBe(serie.temporadas)
  }))

})
