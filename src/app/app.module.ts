import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'

import { AppRoutingModule, routingComponents } from './app-routing.module'
import { AppComponent } from './app.component'
import { CollectionComponent } from './components/collection/collection.component'

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    CollectionComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    FontAwesomeModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
