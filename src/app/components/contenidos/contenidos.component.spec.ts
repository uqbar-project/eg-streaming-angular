import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { FormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser'
import { waitForAsync, TestBed, ComponentFixture } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { ContenidoService } from 'src/app/services/contenido.service'
import { ContenidosComponent } from './contenidos.component'
import { AppRoutingModule } from 'src/app/app-routing.module'

describe('Contenidos Component', () => {
  let fixture: ComponentFixture<ContenidosComponent>

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        BrowserModule,
        FormsModule,
        AppRoutingModule,
        FontAwesomeModule,
      ],
      declarations: [
        ContenidosComponent,
      ],
      providers: [
        { provider: ContenidoService, useClass: ContenidoService },
      ],
    }).compileComponents()
    fixture = TestBed.createComponent(ContenidosComponent)
  }))

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function getByDataTestId(testid: string): any {
    fixture.detectChanges()
    const resultHtml = fixture.debugElement.nativeElement
    return resultHtml.querySelector(`[data-testid="${testid}"]`)
  }

  it('should show films & series', waitForAsync(() => {
    fixture.detectChanges()
    const resultHtml = fixture.debugElement.nativeElement
    expect(resultHtml.querySelectorAll('[data-testid^="fila-"]').length).toBe(4)
  }))
  it('deleting a content show be reflected on view', waitForAsync(() => {
    fixture.detectChanges()
    const contenidos = fixture.componentInstance.contenidos
    const contenido = contenidos[0]
    getByDataTestId(`eliminar-${contenido.id}`).click()
    fixture.detectChanges()
    fixture.whenStable().then(() => {
      expect(fixture.componentInstance.contenidos.length).toBe(3)
    })
  }))
})
