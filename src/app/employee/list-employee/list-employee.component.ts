import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { EmployeeService } from '../employee.service';
import { IEmployee } from '../IEmployee';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-employee',
  templateUrl: './list-employee.component.html',
  styleUrls: ['./list-employee.component.css']
})
export class ListEmployeeComponent implements OnInit {

  constructor(private service: EmployeeService, private router: Router) { }

  employeeList: IEmployee[]


  ngOnInit() {
    this.service.getAllEmployees().subscribe(
      res => {
        this.employeeList = res.map(e => {
          return {
            id: e.payload.doc.id,
            ...e.payload.doc.data()
          } as IEmployee;
        })
        console.log(this.employeeList)
      }
    );

  }

  deleteEmployee(id) {
    this.service.deleteEmployee(id).then(
      res => {
        console.log(res)
      }
    );
  }

  getEmployee(id) {
    this.router.navigate(['/update',id])
  }

}
