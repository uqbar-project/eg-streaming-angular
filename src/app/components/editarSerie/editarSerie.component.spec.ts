import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { FormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser'
import { waitForAsync, TestBed, ComponentFixture } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { ContenidoService } from 'src/app/services/contenido.service'
import { AppRoutingModule } from 'src/app/app-routing.module'
import { DebugElement } from '@angular/core'
import { EditarSerieComponent } from './editarSerie.component'
import { ActivatedRoute } from '@angular/router'
import { Serie } from 'src/app/domain/contenido'


describe('Serie Component', () => {
  let app: DebugElement
  let fixture: ComponentFixture<EditarSerieComponent>
  let contenidoService: ContenidoService
  let serie: Serie

  beforeEach(waitForAsync(() => {
    contenidoService = new ContenidoService()
    serie = contenidoService.contenidos.filter((serie) => serie.type === 'serie')[0] as Serie
    contenidoService.contenido = serie

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        BrowserModule,
        FormsModule,
        AppRoutingModule,
        FontAwesomeModule,
      ],
      declarations: [
        EditarSerieComponent,
      ],
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
    app = fixture.debugElement
    fixture.detectChanges()
  }))

  it('changing season takes effect', waitForAsync(() => {
    const resultHtml = app.nativeElement
    const cantidadTemporadas = getByDataTestId(resultHtml, 'cantidadTemporadas').value
    expect(Number(cantidadTemporadas)).toBe(serie.temporadas)
  }))
})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getByDataTestId(resultHtml: any, testid: string): any {
  return resultHtml.querySelector(`[data-testid="${testid}"]`)
}

