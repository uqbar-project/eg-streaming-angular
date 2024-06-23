import { ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing'

import { CollectionComponent } from './collection.component'
import { RouterModule } from '@angular/router'

describe('CollectionComponent', () => {
  let component: CollectionComponent
  let fixture: ComponentFixture<CollectionComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CollectionComponent, RouterModule.forRoot([])]
    }).compileComponents()

    fixture = TestBed.createComponent(CollectionComponent)
    component = fixture.componentInstance
    const fila = {
      personas: [ 'Juan', 'Julián', 'Ana', 'Dorotea' ]
    }
    component.collection = 'personas'
    component.container = fila
    component.description = 'Persona'
    component.type = 'text'
    fixture.detectChanges()
  })

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function getByDataTestId(testid: string): any {
    const resultHtml = fixture.debugElement.nativeElement
    return resultHtml.querySelector(`[data-testid="${testid}"]`)
  }

  it('collection should initially appear', fakeAsync(() => {
    const resultHtml = fixture.nativeElement
    expect(resultHtml.querySelectorAll(`[data-testid^="elem-"]`).length).toBe(4)
  }))
  it('you can add an element to the collection', fakeAsync(() => {
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
