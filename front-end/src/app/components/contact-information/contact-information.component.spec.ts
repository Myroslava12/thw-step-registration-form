import 'zone.js';
import 'zone.js/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CountryCodesFacade } from '../../store/country-codes/country-codes.facade';
import { RegistrationFacade } from '../../store/registration/registration.facade';

import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from "@angular/platform-browser-dynamic/testing";

import { ContactInformationComponent } from './contact-information.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { reducers } from '../../store';

describe('ContactInformationComponent', () => {
  let component: ContactInformationComponent;
  let fixture: ComponentFixture<ContactInformationComponent>;

  beforeAll(() => {
    TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
  });
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StoreModule.forRoot(reducers), ReactiveFormsModule, FormsModule],
      declarations: [ ContactInformationComponent ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [CountryCodesFacade, RegistrationFacade]
    })
    .compileComponents();
  });

  beforeEach(async () => {
    fixture = TestBed.createComponent(ContactInformationComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create', ()=> {
    expect(component).toBeTruthy();
  });

  it('Check initial form values for Contact form group', () => {
    const contactFormGroup = component.form;
    const contactFormValues = {
      country: 'PL',
      phoneNumber: ''
    }
    
    expect(contactFormGroup.get('phoneNumber')?.disable).toBeTruthy();

    contactFormGroup.get('country')?.setValue('PL');

    expect(contactFormGroup.get('phoneNumber')?.enable).toBeTruthy();

    expect(contactFormGroup.value).toEqual(contactFormValues);
  });

  it('Country should be required', async(() => {
    const country = component.form.get('country');

    expect(country?.hasError('required').valueOf()).toBeTruthy();

    country?.setValue('PL');

    expect(country?.hasError('required').valueOf()).toBeFalsy();
  }));

  it('Phone number should be required', async(() => {
    const phoneNumber = component.form.get('phoneNumber');

    component.form.get('country')?.setValue('PL');

    expect(phoneNumber?.hasError('required').valueOf()).toBeTruthy();
    component.countryDialCode = '+48'

    phoneNumber?.setValue('9877899878');

    expect(phoneNumber?.hasError('required').valueOf()).toBeFalsy();
  }));

  it('Phone number should have an error than phone number is invalid', async(() => {
    const phoneNumber = component.form.get('phoneNumber');
    component.countryDialCode = "+48"

    phoneNumber?.setValue('89789789');
    expect(component.form.hasError('phoneNumberInvalid').valueOf()).toBeTruthy();
    
    phoneNumber?.setValue('897897897');
    expect(component.form.errors).toBeNull();
  }));

  it('Should display review modal', async () => {
    component.countryDialCode = "+48";

    component.form.get('country')?.setValue(component.countryDialCode)
    component.form.get('phoneNumber')?.setValue('897897897');

    try {
      await component.onOpenReviewDialog();
      expect(component.modalIsVisable).toBeTruthy();
    } catch(er) {
      expect(component.modalIsVisable).toBeFalsy();
    }
  });
});
