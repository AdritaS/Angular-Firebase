import { NgModule } from '@angular/core';
import { EmployeeComponent } from './employee.componet';
import { ListEmployeeComponent } from './list-employee/list-employee.component';
import { SaveEmployeeComponent } from './save-employee/save-employee.component';
import { EmployeeRoutingModule } from './employee-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    EmployeeRoutingModule,
    SharedModule
  ],
  declarations: [
    EmployeeComponent,
    ListEmployeeComponent,
    SaveEmployeeComponent,
  ]
})
export class EmployeeModule { }
