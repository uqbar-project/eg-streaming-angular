import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { FormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser'
import { waitForAsync, TestBed, ComponentFixture } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { ContenidoService } from 'src/app/services/contenido.service'
import { AppRoutingModule } from 'src/app/app-routing.module'
import { DebugElement } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Contenido } from 'src/app/domain/contenido'
import { EditarContenidoComponent } from './editarContenido.component'


describe('Serie Component', () => {
  let app: DebugElement
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
    app = fixture.debugElement
    fixture.detectChanges()
  }))

  it('content title is shown', waitForAsync(() => {
    const resultHtml = app.nativeElement
    const titulo = getByDataTestId(resultHtml, 'titulo').value
    expect(titulo).toBe(contenido.titulo)
  }))
})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getByDataTestId(resultHtml: any, testid: string): any {
  return resultHtml.querySelector(`[data-testid="${testid}"]`)
}
