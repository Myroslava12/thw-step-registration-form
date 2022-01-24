import 'zone.js';
import 'zone.js/testing';
import "@angular/compiler"
import {provideMockActions, } from '@ngrx/effects/testing';
import {
    BrowserDynamicTestingModule,
    platformBrowserDynamicTesting
  } from "@angular/platform-browser-dynamic/testing";
import { StoreModule } from '@ngrx/store';
import { reducers } from '../../store';
import { registrationReducer, RegistrationState } from './registration.reducer';
import { TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { ReplaySubject } from 'rxjs';

describe('registrationReducer', () => {
  let actions$: ReplaySubject<any>;
  const initialValues: RegistrationState = {
    firstName: '',
    lastName: '',
    country: '',
    phoneNumber: ''
  }
  beforeAll(() => {
    TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
  });
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StoreModule.forRoot(reducers), CommonModule],
      providers: [provideMockActions(() => actions$)]
    })
    .compileComponents();
  });

  describe('unknown action', () => {
    it('should return the default state', () => {
      const action = {
        type: 'Unknown',
      };
      const state = registrationReducer(initialValues, action);
 
      expect(state).toBe(initialValues);
    });
  });

  describe('[Registration Page] Personal Info Success', () => {
    it('should save personal information to store', () => {
      const action = {
        type: '[Registration Page] Personal Info Success',
        firstName: 'John',
        lastName: 'Smith'
      }
      const updates = {
        ...initialValues,
        firstName: action.firstName,
        lastName: action.lastName
      }

      const result = registrationReducer(initialValues, action);
      expect(result).toEqual(updates);
    });
  });

  describe('[Registration Page] Contact Info Success', () => {
    it('should save contact information to store', () => {
      const action = {
        type: '[Registration Page] Contact Info Success',
        country: 'PL',
        phoneNumber: '+48777888777'
      }
      const updates = {
        ...initialValues,
        country: action.country,
        phoneNumber: action.phoneNumber
      }

      const result = registrationReducer(initialValues, action);
      expect(result).toEqual(updates);
    });
  });
});
