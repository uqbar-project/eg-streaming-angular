import { ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing'

import { ContenidosComponent } from './contenidos.component'
import { RouterModule } from '@angular/router'
import { getByDataTestId } from 'testUtils'

describe('ContenidosComponent', () => {
  let fixture: ComponentFixture<ContenidosComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContenidosComponent, RouterModule.forRoot([])]
    }).compileComponents()

    fixture = TestBed.createComponent(ContenidosComponent)
    fixture.detectChanges()
  })

  it('should show films & series', fakeAsync(() => {
    fixture.detectChanges()
    const resultHtml = fixture.debugElement.nativeElement
    expect(resultHtml.querySelectorAll('[data-testid^="fila-"]').length).toBe(4)
  }))
  it('deleting a content show be reflected on view', fakeAsync(() => {
    fixture.detectChanges()
    const contenidos = fixture.componentInstance.contenidos
    const contenido = contenidos[0]
    getByDataTestId(fixture, `eliminar-${contenido.id}`).click()
    fixture.detectChanges()
    fixture.whenStable().then(() => {
      expect(fixture.componentInstance.contenidos.length).toBe(3)
    })
  }))
  
})
