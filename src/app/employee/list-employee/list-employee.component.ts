import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-list-employee',
  templateUrl: './list-employee.component.html',
  styleUrls: ['./list-employee.component.css']
})
export class ListEmployeeComponent implements OnInit {

  constructor(private service: EmployeeService) { }



  ngOnInit() {
    this.service.getAllEmployees().subscribe(
      res => {
        console.log(res)
      }
    );

    this.service.getAllEmployees().subscribe((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log(doc);
      });
    })
  }

}
