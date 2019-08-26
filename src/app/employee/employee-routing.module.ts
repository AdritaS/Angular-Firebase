import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListEmployeeComponent } from './list-employee/list-employee.component';
import { SaveEmployeeComponent } from './save-employee/save-employee.component';


const employeeRoutes: Routes = [
  {
    path: '', children: [
      { path: '', component: ListEmployeeComponent },
      { path: 'create', component: SaveEmployeeComponent },
      { path: 'update/:id', component: SaveEmployeeComponent }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(employeeRoutes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }