import { ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing'

import { EditarContenidoComponent } from './editar-contenido.component'
import { ActivatedRoute, Router, RouterModule } from '@angular/router'
import { ContenidoService } from 'services/contenido.service'
import { Contenido } from 'domain/contenido'
import { getByDataTestId } from 'testUtils'

describe('EditarContenidoComponent', () => {
  let fixture: ComponentFixture<EditarContenidoComponent>
  let contenidoService: ContenidoService
  let contenido: Contenido
  let routerSpy: jasmine.SpyObj<Router>

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate'])

    contenidoService = new ContenidoService()
    contenido = contenidoService.contenidos[0]
    contenidoService.contenido = contenido

    await TestBed.configureTestingModule({
      imports: [EditarContenidoComponent, RouterModule.forRoot([])],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            firstChild: {
              snapshot: {
                params: { 'id': contenido.id },
              },
            },
            url: {
              subscribe: function (fn: () => void) {
                fn()
              }
            }
          }
        },
        { provide: ContenidoService, useValue: contenidoService },
        { provide: Router, useValue: routerSpy }
      ],
    }).compileComponents()

    fixture = TestBed.createComponent(EditarContenidoComponent)
    fixture.detectChanges()
  })

  it('update flow - initially content title is shown', fakeAsync(() => {
    const titulo = getByDataTestId(fixture, 'titulo').value
    expect(titulo).toBe(contenido.titulo)
  }))
  it('update flow - save', async () => {
    const contenido = fixture.componentInstance.contenido
    const nuevoTitulo = 'Serie A'
    contenido.titulo = nuevoTitulo
    fixture.detectChanges()
    getByDataTestId(fixture, 'guardar').click()
    fixture.detectChanges()
    await fixture.whenStable()
    expect(nuevoTitulo).toBe(contenido.titulo)
    const [route] = routerSpy.navigate.calls.first().args[0]
    expect(route).toBe('/list')
  })
  it('update flow - cancel', async () => {
    const contenido = fixture.componentInstance.contenido
    const viejoTitulo = contenido.titulo
    const nuevoTitulo = 'Serie A'
    contenido.titulo = nuevoTitulo
    fixture.detectChanges()
    getByDataTestId(fixture, 'cancelar').click()
    fixture.detectChanges()
    await fixture.whenStable()
    const [route] = routerSpy.navigate.calls.first().args[0]
    expect(route).toBe('/list')
    const nuevoContenido = contenidoService.getContenidoById('' + contenido.id)
    expect(viejoTitulo).toBe(nuevoContenido?.titulo || '')
  })

})
