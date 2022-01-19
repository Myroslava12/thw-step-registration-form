import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms';
import { Observable } from 'rxjs';
import { RegistrationFacade } from 'src/app/store/registration/registration.facade';

@Component({
  selector: 'app-personal-information-component',
  templateUrl: './personal-information.component.html',
  styleUrls: ['./personal-information.component.scss']
})
export class PersonalInformationComponent implements OnInit {
  form: FormGroup;
  firstName$: Observable<string>;
  lastName$: Observable<string>;

  constructor(private formBuilder: FormBuilder, private registrationFacade: RegistrationFacade) {
    this.firstName$ = this.registrationFacade.firstName$;
    this.lastName$ = this.registrationFacade.lastName$;

    this.form = this.formBuilder.group({
      firstName: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z \-\']+')]),
      lastName: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z \-\']+')])
    }, {
      validator: this.firstAndLastNamesValidator('firstName', 'lastName')
    });

    this.firstName$.subscribe((val) => {
      this.form.patchValue({ firstName: val });
    });

    this.lastName$.subscribe((val) => {
      this.form.patchValue({ lastName: val });
    });
  }

  ngOnInit(): void {}

  firstAndLastNamesValidator(firstNameControl: string, lastNameControl: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const firstName = control.get(firstNameControl)?.value;
      const lastName = control.get(lastNameControl)?.value;

      if (firstName.length === 1 && lastName.length === 1) {
        return {
          'isShort': true
        }
      } else {
        return null;
      }
    }
  }

  handleSubmit() {
    this.form.markAllAsTouched();

    if (this.form.invalid) return;
    
    this.registrationFacade.postPersonalInformation(this.form.value);
  }

  get controls() {
    return this.form.controls;
  }

}
