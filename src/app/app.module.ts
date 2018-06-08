import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'

import { AppRoutingModule, routingComponents } from './app-routing.module'
import { AppComponent } from './app.component'
import { FormsModule } from '@angular/forms'
import { CollectionComponent } from '../components/collection/collection.component'
import { MyDatePickerModule, MyDatePicker } from 'mydatepicker'

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    CollectionComponent
],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    MyDatePickerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
