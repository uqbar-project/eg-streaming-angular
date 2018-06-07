import { Component, OnInit, Input } from '@angular/core'

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.css']
})
export class CollectionComponent implements OnInit {
  
  @Input() container : any
  @Input() collection : string
  @Input() type : string
  @Input() description : string
  value : any
  elements : any[]
  errorMessage : string = ""

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
    if (this.type.toLowerCase() == 'number') {
      value = Number.parseInt(this.value)
    }
    this.elements.push(value)
    this.value = ''
  }

  eliminar(elem) {
    this.errorMessage = ''
    this.elements = this.elements.filter((item) => item != elem)
  }

  get inputType() : string {
    if (this.type.toLowerCase() == 'number') {
      return 'NUMBER'
    }
    return 'TEXT'
  }

}
