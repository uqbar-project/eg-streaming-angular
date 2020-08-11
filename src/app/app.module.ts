import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { AngularMyDatePickerModule } from 'angular-mydatepicker'

import { CollectionComponent } from '../components/collection/collection.component'
import { AppRoutingModule, routingComponents } from './app-routing.module'
import { AppComponent } from './app.component'

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    CollectionComponent
  ],
  imports: [
    AppRoutingModule,
    AngularMyDatePickerModule,
    BrowserModule,
    FormsModule,
    FontAwesomeModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
