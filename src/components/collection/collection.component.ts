import { Component, Input, OnInit } from '@angular/core'

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

  eliminar(index) {
    this.errorMessage = ''
    this.elements.splice(index, 1)
    // la gente en Stack Overflow anda diciendo...
    // https://stackoverflow.com/questions/15292278/how-do-i-remove-an-array-item-in-typescript
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
