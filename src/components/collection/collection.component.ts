import { Component, Input, OnInit } from '@angular/core'
import { remove } from 'lodash'

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.css']
})
export class CollectionComponent implements OnInit {

  @Input() container: any
  @Input() collection: string
  @Input() type: string
  @Input() description: string
  value: any
  elements: any[]
  errorMessage = ''

  constructor() { }

  ngOnInit() {
    this.elements = this.container[this.collection]
  }

  agregar() {
    this.errorMessage = ''
    if (!this.value) {
      this.errorMessage = 'El contenido no puede ser vacío'
      return
    }
    let value = this.value
    if (this.workingWithNumbers()) {
      value = Number(this.value)
    }
    this.elements.push(value)
    this.value = ''
  }

  eliminar(elem) {
    this.errorMessage = ''

    // usamos Lodash: https://lodash.com/docs/latest#remove
    // importamos remove como función, 
    // una alternativa es usarlo como objeto _.remove(...)
    // e importarlo como `import * as _ from 'lodash'`
    // pero eso importa TODAS las funciones y el bundle crece en tamaño
    remove(this.elements, (e) => elem === e)

    // otra opción
    // this.elements = this.elements.filter((item) => item !== elem)

    // la gente en Stack Overflow anda diciendo...
    // https://stackoverflow.com/questions/15292278/how-do-i-remove-an-array-item-in-typescript
    // const index = this.elements.findIndex((item) => item === elem)
    // if (index > -1) {
    //   this.elements.splice(index, 1)
    // }
  }

  get inputType(): string {
    if (this.workingWithNumbers()) {
      return 'NUMBER'
    }
    return 'TEXT'
  }

  workingWithNumbers() {
    return this.type.toLowerCase() === 'number'
  }
}
