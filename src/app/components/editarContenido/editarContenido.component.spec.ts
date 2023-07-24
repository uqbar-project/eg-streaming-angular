import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { FormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser'
import { waitForAsync, TestBed, ComponentFixture } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { ContenidoService } from 'src/app/services/contenido.service'
import { AppRoutingModule } from 'src/app/app-routing.module'
import { ActivatedRoute, Router } from '@angular/router'
import { Contenido } from 'src/app/domain/contenido'
import { EditarContenidoComponent } from './editarContenido.component'
import { CollectionComponent } from '../collection/collection.component'

describe('Contenido Component', () => {
  let fixture: ComponentFixture<EditarContenidoComponent>
  let contenidoService: ContenidoService
  let contenido: Contenido
  let routerSpy: jasmine.SpyObj<Router>

  beforeEach(waitForAsync(() => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate'])

    contenidoService = new ContenidoService()
    contenido = contenidoService.contenidos[0]
    contenidoService.contenido = contenido

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        BrowserModule,
        FormsModule,
        AppRoutingModule,
        FontAwesomeModule,
      ],
      declarations: [
        EditarContenidoComponent,
        CollectionComponent,
      ],
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
  }))

  it('update flow - initially content title is shown', waitForAsync(() => {
    const titulo = getByDataTestId('titulo').value
    expect(titulo).toBe(contenido.titulo)
  }))
  it('update flow - save', waitForAsync(() => {
    const contenido = fixture.componentInstance.contenido
    const nuevoTitulo = 'Serie A'
    contenido.titulo = nuevoTitulo
    fixture.detectChanges()
    getByDataTestId('guardar').click()
    fixture.detectChanges()
    fixture.whenStable().then(() => {
      expect(nuevoTitulo).toBe(contenido.titulo)
      const [route] = routerSpy.navigate.calls.first().args[0]
      expect(route).toBe('/list')
    })
  }))
  it('update flow - cancel', waitForAsync(() => {
    const contenido = fixture.componentInstance.contenido
    const viejoTitulo = contenido.titulo
    const nuevoTitulo = 'Serie A'
    contenido.titulo = nuevoTitulo
    fixture.detectChanges()
    getByDataTestId('cancelar').click()
    fixture.detectChanges()
    fixture.whenStable().then(() => {
      const nuevoContenido = contenidoService.getContenidoById('' + contenido.id)
      const [route] = routerSpy.navigate.calls.first().args[0]
      expect(route).toBe('/list')
      expect(viejoTitulo).toBe(nuevoContenido?.titulo || '')
    })
  }))

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function getByDataTestId(testid: string): any {
    return fixture.debugElement.nativeElement.querySelector(`[data-testid="${testid}"]`)
  }

})
