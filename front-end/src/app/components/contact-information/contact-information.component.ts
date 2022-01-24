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
import { Country } from '../../interfaces';
import { PhoneNumberUtil } from 'google-libphonenumber';
import { CountryCodesFacade } from '../../store/country-codes/country-codes.facade';
import { RegistrationFacade } from '../../store/registration/registration.facade';
import { Router } from '@angular/router';
import { reducers } from 'src/app/store';
import { RegistrationState } from 'src/app/store/registration/registration.reducer';

@Component({
  selector: 'app-contact-information-component',
  templateUrl: './contact-information.component.html',
  styleUrls: ['./contact-information.component.scss']
})
export class ContactInformationComponent implements OnInit {
  modalIsVisable: boolean = false;
  form: FormGroup;
  countryCodes$: Observable<Country[]>;
  countryDialCode: string;
  isLoading$: Observable<boolean>;
  errorMessage$: Observable<string | null>;
  registrationData$: Observable<RegistrationState>;

  constructor(
    private formBuilder: FormBuilder,
    private countryCodesFacade: CountryCodesFacade,
    private registrationFacade: RegistrationFacade,
    private router: Router) 
  {
    this.countryCodes$ = this.countryCodesFacade.countryCodes$;
    this.isLoading$ = this.countryCodesFacade.isLoading$;
    this.errorMessage$ = this.countryCodesFacade.errorMessage$;
    this.registrationData$ = this.registrationFacade.registrationData$;
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      country: new FormControl('', [Validators.required]),
      phoneNumber: new FormControl('', [Validators.required])
    }, {
      validator: this.phoneNumberValidation('phoneNumber')
    });
  
    this.form.get('country')?.valueChanges.subscribe(val => {
      if (val.length !== 0) {
        this.form.get('phoneNumber')?.enable();
      }
    });

    if (this.form.get('country')?.value.length === 0) {
      this.form.get('phoneNumber')?.disable();
    }

    this.getCountryCodes();
  }

  phoneNumberValidation(phoneNumberValue: string): ValidatorFn {
    const phoneNumberUtil = PhoneNumberUtil.getInstance();
    let validNumber = false;
    
    return (control: AbstractControl): ValidationErrors | null => {
      if (this.countryDialCode && `${control.get(phoneNumberValue)?.value}`.length > 1) {
        const phoneNumber = phoneNumberUtil.parse(
          `${control.get(phoneNumberValue)?.value}`, this.form.get('country')?.value
        );

        validNumber = phoneNumberUtil.isValidNumber(phoneNumber);

        return validNumber ? null : { 'phoneNumberInvalid': true };
      }

      return null;
    }
  }

  getCountryCodes() {
    this.countryCodesFacade.getCountryCodes();
  }

  onOpenReviewDialog() {
    this.form.markAllAsTouched();

    if (this.form.invalid) return;

    const value = this.form.value;
    const updates = {
      ...value,
      phoneNumber: `${this.countryDialCode} ${value.phoneNumber}`
    }

    this.registrationFacade.postContactInformation(updates);

    setTimeout(() => this.modalIsVisable = true);
  }

  get controls() {
    return this.form.controls;
  }

  onCloseReviewDialog(value: boolean) {
    this.modalIsVisable = value;
  }

  changeCountry(e: any) {
    this.countryDialCode = e.target.selectedOptions[0].dataset.country;
  }

  onSubmit() {
    this.registrationData$.subscribe((result) => {
      console.log(result);
    });
    
    this.router.navigate(['/']);
  }
}
