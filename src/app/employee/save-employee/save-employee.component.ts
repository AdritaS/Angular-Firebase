import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { EmployeeService } from '../employee.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomValidators } from 'src/app/shared/custom.validators';

@Component({
  selector: 'app-save-employee',
  templateUrl: './save-employee.component.html',
  styleUrls: ['./save-employee.component.css']
})
export class SaveEmployeeComponent implements OnInit {

  constructor(private service: EmployeeService, private fb: FormBuilder, private router: Router, private route: ActivatedRoute) { }

  employeeForm: FormGroup;

  validationMessages = {
    'fullName': {
      'required': 'Full Name is required.',
      'minlength': 'Full Name must be greater than 2 characters.',
      'maxlength': 'Full Name must be less than 10 characters.'
    },
    'email': {
      'required': 'Email is required.',
      'emailDomain': 'Email domian should be gmail.com'
    },
    'phone': {
      'required': 'Phone is required.',
      'minlength': 'Phone Number must be 10 digits.',
    },
    'pan': {
      'required': 'PAN No is required.',
      'panFormat': 'PAN No Format should AAAAA1111A'
    },
    'skillName': {
      'required': 'Skill Name is required.',
    },
    'experienceInYears': {
      'required': 'Phone is required.',
    },
    'proficiency': {
      'required': 'Proficiency is required.',
    },
  };
  formErrors = {
    'fullName': '',
    'email': '',
    'phone': '',
    'pan': '',
    'skillName': '',
    'experienceInYears': '',
    'proficiency': ''
  };

  ngOnInit() {

    this.employeeForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(2)]],
      contactPreference: ['email'],
      email: ['', [Validators.required, CustomValidators.emailDomain('gmail.com')]],
      phone: [''],
      pan: ['', [Validators.required,CustomValidators.panFormat]],
      skills: this.fb.group({
        skillName: ['', Validators.required],
        experienceInYears: ['', Validators.required],
        proficiency: ['', Validators.required]
      })
    });

    this.detectValueChanges()

    let routeParam = this.route.snapshot.params['id'];
    if (routeParam) {
      this.getEmployeeById(routeParam)
    }
  }

  logValidationErrors(group: FormGroup): void {
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key);
      if (abstractControl instanceof FormGroup) {
        this.logValidationErrors(abstractControl);
      } else {
        this.formErrors[key] = '';
        if (abstractControl && !abstractControl.valid && (abstractControl.touched || abstractControl.dirty)) {
          const messages = this.validationMessages[key];
          for (const errorKey in abstractControl.errors) {
            if (errorKey) {
              this.formErrors[key] += messages[errorKey] + ' ';
              console.log(this.formErrors[key])
            }
          }
        }
      }
    });
  }


  detectValueChanges() {
    // this.employeeForm.get('fullName').valueChanges.subscribe(
    //   value => {
    //     console.log(value);
    //   }
    // );

    this.employeeForm.valueChanges.subscribe(
      value => {
        //   console.log(value);
        this.logValidationErrors(this.employeeForm)
      }
    );

    // this.employeeForm.get("skills").valueChanges.subscribe(
    //   value => {
    //     console.log(value);
    //   }
    // );
  }

  disableForm(group = this.employeeForm) {
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key);
      if (abstractControl instanceof FormGroup) {
        this.disableForm(abstractControl);
      } else {
        abstractControl.disable();
      }
    });
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

  onContactPrefernceChange(selectedValue: string) {
    const phoneFormControl = this.employeeForm.get('phone');
    if (selectedValue === 'phone') {
      phoneFormControl.setValidators([Validators.required, Validators.minLength(10)]);
    } else {
      phoneFormControl.clearValidators();
    }
    phoneFormControl.updateValueAndValidity();
  }


}






