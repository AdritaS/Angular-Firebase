import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { EmployeeService } from '../employee.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-save-employee',
  templateUrl: './save-employee.component.html',
  styleUrls: ['./save-employee.component.css']
})
export class SaveEmployeeComponent implements OnInit {

  constructor(private service: EmployeeService, private fb: FormBuilder, private router: Router, private route: ActivatedRoute) { }

  employeeForm: FormGroup;

  ngOnInit() {

    // this.employeeForm = new FormGroup({
    //   fullName: new FormControl(),
    //   email: new FormControl(),
    //   skills: new FormGroup({
    //     skillName: new FormControl(),
    //     experienceInYears: new FormControl(),
    //     proficiency: new FormControl()
    //   })
    // });

    this.employeeForm = this.fb.group({
      fullName: [''],
      email: [''],
      skills: this.fb.group({
        skillName: [''],
        experienceInYears: [''],
        proficiency: ['beginner']
      })
    });

    let routeParam = this.route.snapshot.params['id'];
    if (routeParam) {
      this.getEmployeeById(routeParam)
    }
  }

  getEmployeeById(id) {
    this.service.getEmployeeById(id).subscribe(
      res => {
        console.log(res.data())
        this.employeeForm.setValue(res.data());
      }
    );
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
