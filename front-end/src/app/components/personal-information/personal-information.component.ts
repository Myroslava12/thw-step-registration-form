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
import { Content } from 'src/app/interfaces';
import { ContentFacade } from 'src/app/store/content/content.facade';
import { RegistrationFacade } from '../../store/registration/registration.facade';

@Component({
  selector: 'app-personal-information-component',
  templateUrl: './personal-information.component.html',
  styleUrls: ['./personal-information.component.scss']
})
export class PersonalInformationComponent implements OnInit {
  form: FormGroup;
  firstName$: Observable<string>;
  lastName$: Observable<string>;
  contents$ : Observable<any>;
  isLoading$: Observable<boolean>;
  errorMessage$: Observable<string | null>;

  constructor(
    private formBuilder: FormBuilder,
    private registrationFacade: RegistrationFacade,
    private contentFacade: ContentFacade
  ) {
    this.firstName$ = this.registrationFacade.firstName$;
    this.lastName$ = this.registrationFacade.lastName$;
    this.contents$ = this.contentFacade.personalInfoContents$;
    this.isLoading$ = this.contentFacade.isLoading$;
    this.errorMessage$ = this.contentFacade.errorMessage$;
  }

  ngOnInit(): void {
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

    this.contents$.subscribe(result => {
      if (!result) {
        this.contentFacade.getPersonalInfoContents();
      }

      console.log(result);
    });
  }

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
