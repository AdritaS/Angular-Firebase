import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ListEmployeeComponent } from './employee/list-employee/list-employee.component';
import { SaveEmployeeComponent } from './employee/save-employee/save-employee.component';

@NgModule({
  declarations: [
    AppComponent,
    ListEmployeeComponent,
    SaveEmployeeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
