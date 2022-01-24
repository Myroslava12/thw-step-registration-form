import 'zone.js';
import 'zone.js/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from "@angular/platform-browser-dynamic/testing";
import { StoreModule } from '@ngrx/store';
import { reducers } from '../../store';
import { RegistrationFacade } from '../../store/registration/registration.facade';

import { PersonalInformationComponent } from './personal-information.component';

describe('PersonalInformationComponent', () => {
  let component: PersonalInformationComponent;
  let fixture: ComponentFixture<PersonalInformationComponent>;

  beforeAll(() => {
    TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
  });
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StoreModule.forRoot(reducers), ReactiveFormsModule, FormsModule],
      declarations: [ PersonalInformationComponent ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [RegistrationFacade],
    })
    .compileComponents();
  });

  beforeEach(async () => {
    fixture = TestBed.createComponent(PersonalInformationComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Check initial form values for Personal form group', () => {
    const form = component.form;
    const personalFormValues = {
      firstName: '',
      lastName: ''
    }

    expect(form.value).toEqual(personalFormValues);
  });

  it('First name is required and must not be contain numbers', async(() => {
    const firstName = component.form.get('firstName');
    
    expect(firstName?.hasError('required').valueOf()).toBeTruthy();

    firstName?.setValue('John5');

    expect(firstName?.hasError('required').valueOf()).toBeFalsy();
    expect(firstName?.hasError('pattern').valueOf()).toBeTruthy();

    firstName?.setValue('John');
    expect(firstName?.errors).toBeNull();
  }));

  it('Last name is required and must not be contain numbers', async(() => {
    const lastName = component.form.get('lastName');

    expect(lastName?.hasError('required').valueOf()).toBeTruthy();

    lastName?.setValue('Smith5');

    expect(lastName?.hasError('required').valueOf()).toBeFalsy();
    expect(lastName?.hasError('pattern').valueOf()).toBeTruthy();

    lastName?.setValue('Smith');
    expect(lastName?.errors).toBeNull();
  }));

  it('The first and last names cannot be 1 letter long the same time', async(() => {
    component.form.setValue({
      firstName: 'T',
      lastName: 'N'
    });

    expect(component.form.hasError('isShort').valueOf()).toBeTruthy();

    component.form.setValue({
      firstName: 'T',
      lastName: 'Smith'
    });

    expect(component.form.errors).toBeNull();
  }));
});
