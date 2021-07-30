import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { FormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser'
import { waitForAsync, TestBed, ComponentFixture } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { ContenidoService } from 'src/app/services/contenido.service'
import { AppRoutingModule } from 'src/app/app-routing.module'
import { DebugElement } from '@angular/core'
import { Serie } from 'src/app/domain/contenido'
import { CollectionComponent } from './collection.component'


describe('Serie Component', () => {
  let app: DebugElement
  let fixture: ComponentFixture<CollectionComponent>
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
        CollectionComponent,
      ],
    }).compileComponents()
    fixture = TestBed.createComponent(CollectionComponent)
    app = fixture.debugElement
    const component = fixture.componentInstance
    const fila = {
      personas: [ 'Juan', 'Julián', 'Ana', 'Dorotea' ]
    }
    component.collection = 'personas'
    component.container = fila
    component.description = 'Persona'
    component.type = 'text'
    fixture.detectChanges()
  }))

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function getByDataTestId(testid: string): any {
    const resultHtml = fixture.debugElement.nativeElement
    return resultHtml.querySelector(`[data-testid="${testid}"]`)
  }

  it('collection should initially appear', waitForAsync(() => {
    const resultHtml = app.nativeElement
    expect(resultHtml.querySelectorAll(`[data-testid^="elem-"]`).length).toBe(4)
  }))
  it('you can add an element to the collection', waitForAsync(() => {
    const NUEVO_VALOR = 'nuevoValor'
    const component = fixture.componentInstance
    component.value = NUEVO_VALOR
    fixture.detectChanges()
    getByDataTestId('agregar').click()
    fixture.detectChanges()
    fixture.whenStable().then(() => {
      fixture.detectChanges()
      const resultHtml = fixture.debugElement.nativeElement
      expect(resultHtml.querySelectorAll(`[data-testid^="elem-"]`).length).toBe(5)
    })
  }))

})

