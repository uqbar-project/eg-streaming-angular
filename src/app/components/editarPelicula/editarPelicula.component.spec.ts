import { EditarPeliculaComponent } from './editarPelicula.component'
import { Pelicula } from '../../domain/contenido'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { FormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser'
import { waitForAsync, TestBed, ComponentFixture } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { ContenidoService } from 'src/app/services/contenido.service'
import { AppRoutingModule } from 'src/app/app-routing.module'
import { DebugElement } from '@angular/core'
import { ActivatedRoute } from '@angular/router'


describe('Serie Component', () => {
  let app: DebugElement
  let fixture: ComponentFixture<EditarPeliculaComponent>
  let contenidoService: ContenidoService
  let pelicula: Pelicula

  beforeEach(waitForAsync(() => {
    contenidoService = new ContenidoService()
    pelicula = contenidoService.contenidos.filter((serie) => serie.type === 'pelicula')[0] as Pelicula
    contenidoService.contenido = pelicula

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        BrowserModule,
        FormsModule,
        AppRoutingModule,
        FontAwesomeModule,
      ],
      declarations: [
        EditarPeliculaComponent,
      ],
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
    app = fixture.debugElement
    fixture.detectChanges()
  }))

  it('release date is shown', waitForAsync(() => {
    const resultHtml = app.nativeElement
    const director = getByDataTestId(resultHtml, 'director').value
    expect(director).toBe(pelicula.director)
  }))
})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getByDataTestId(resultHtml: any, testid: string): any {
  return resultHtml.querySelector(`[data-testid="${testid}"]`)
}

