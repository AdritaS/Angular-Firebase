import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl, EmailValidator, FormArray } from '@angular/forms';
import { EmployeeService } from '../employee.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomValidators } from 'src/app/shared/custom.validators';
import { IEmployee } from '../IEmployee';
import { ISkill } from '../ISkill';

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
    'uan': {
      'required': 'UAN is required.',
    },
    'confirmUAN': {
      'required': 'Confirm UAN is required.',
    },
    'UANGroup': {
      'UANMismatch': 'UAN and Confirm do not match.'
    },
    'pan': {
      'required': 'PAN No is required.',
      'panFormat': 'PAN No Format should AAAAA1111A'
    }
  };
  formErrors = {

  }
  isEditForm: boolean = false

  ngOnInit() {

    this.employeeForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(2)]],
      contactPreference: ['email'],
      email: ['', [Validators.required, CustomValidators.emailDomain('gmail.com')]],
      phone: [''],
      UANGroup: this.fb.group({
        uan: ['', [Validators.required]],
        confirmUAN: ['', [Validators.required]],
      }, { validators: matchUANs }),
      pan: ['', [Validators.required, CustomValidators.panFormat]],
      skills: this.fb.array([
        this.addSkillFormGroup()
      ])
    });

    this.detectValueChanges()

    let routeParam = this.route.snapshot.params['id'];
    if (routeParam) {
      this.isEditForm = true
      this.getEmployeeById(routeParam)
    }
  }

  addSkillFormGroup(): FormGroup {
    return this.fb.group({
      skillName: ['', Validators.required],
      experienceInYears: ['', Validators.required],
      proficiency: ['', Validators.required]
    });
  }



  logValidationErrors(group: FormGroup = this.employeeForm): void {
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key);

      this.formErrors[key] = '';
      if (abstractControl && !abstractControl.valid &&
        (abstractControl.touched || abstractControl.dirty || this.isEditForm)) {
        const messages = this.validationMessages[key];

        for (const errorKey in abstractControl.errors) {
          if (errorKey) {
            this.formErrors[key] += messages[errorKey] + ' ';
          }
        }
      }

      if (abstractControl instanceof FormGroup) {
        this.logValidationErrors(abstractControl);
      }
    });
  }
  addSkillButtonClick(): void {
    (<FormArray>this.employeeForm.get('skills')).push(this.addSkillFormGroup());
  }
  removeSkillButtonClick(skillGroupIndex: number): void {
    const skillsFormArray = <FormArray>this.employeeForm.get('skills');
    skillsFormArray.removeAt(skillGroupIndex);
    skillsFormArray.markAsDirty();
    skillsFormArray.markAsTouched();
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
        // this.employeeForm.setValue(res.data());
        this.employeeForm.patchValue(res.data());
        this.employeeForm.setControl('skills', this.setExistingSkills(res.data().skills));
      }
    );
  }

  setExistingSkills(skillSets: ISkill[]): FormArray {
    const formArray = new FormArray([]);
    skillSets.forEach(s => {
      formArray.push(this.fb.group({
        skillName: s.skillName,
        experienceInYears: s.experienceInYears,
        proficiency: s.proficiency
      }));
    });

    return formArray;
  }

  onSubmit(): void {


    console.log(this.employeeForm.value);
    let employeeData: IEmployee = this.employeeForm.value
    console.log(employeeData);

    if (this.isEditForm) {
      this.service.updateEmployee(this.route.snapshot.params['id'],this.employeeForm.value).then(
        res => {
          this.router.navigate(['/list']);
        }
      )

    } else {
      this.service.createEmployee(this.employeeForm.value).then(
        res => {
          this.router.navigate(['/list']);
        }
      )
    }

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

function matchUANs(group: AbstractControl): { [key: string]: any } | null {
  const UANControl = group.get('uan');
  const confirmUANControl = group.get('confirmUAN');

  if (UANControl.value === confirmUANControl.value || confirmUANControl.pristine) {
    return null;
  } else {
    return { 'UANMismatch': true };
  }
}







