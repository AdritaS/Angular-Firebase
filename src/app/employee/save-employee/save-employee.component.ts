import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { EmployeeService } from '../employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-save-employee',
  templateUrl: './save-employee.component.html',
  styleUrls: ['./save-employee.component.css']
})
export class SaveEmployeeComponent implements OnInit {

  constructor(private service: EmployeeService, private router: Router) { }

  employeeForm: FormGroup;

  ngOnInit() {
    this.employeeForm = new FormGroup({
      fullName: new FormControl(),
      email: new FormControl(),
      skills: new FormGroup({
        skillName: new FormControl(),
        experienceInYears: new FormControl(),
        proficiency: new FormControl()
      })
    });
  }

  onSubmit(): void {
    console.log(this.employeeForm.value);
    this.service.createEmployee(this.employeeForm.value).then(
      res => {
        this.router.navigate(['/list']);
      }
    )
    // console.log(this.employeeForm.get("fullName").value,this.employeeForm.get("fullName").valid);

  }

}
