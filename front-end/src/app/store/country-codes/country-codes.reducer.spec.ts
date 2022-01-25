import 'zone.js';
import 'zone.js/testing';
import '@angular/compiler'
import {provideMockActions, } from '@ngrx/effects/testing';
import {
    BrowserDynamicTestingModule,
    platformBrowserDynamicTesting
  } from '@angular/platform-browser-dynamic/testing';
import { StoreModule } from '@ngrx/store';
import { reducers } from '../../store';
import { countryCodesReducer, CountryCodesState } from './country-codes.reducer';
import { TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { ReplaySubject } from 'rxjs';

describe('registrationReducer', () => {
  let actions$: ReplaySubject<any>;
  const initialValues: CountryCodesState = {
    countryCodes: [],
    isLoading: false,
    errorMessage: null
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
      const state = countryCodesReducer(initialValues, action);
 
      expect(state).toBe(initialValues);
    });
  });

  describe('[Registration Page] Country Codes Request', () => {
    it('should request country codes data', () => {
      const action = {
        type: '[Registration Page] Country Codes Request'
      }

    const updates = {
      ...initialValues,
      isLoading: true
    }

      const result = countryCodesReducer(initialValues, action);
      expect(result).toEqual(updates);
    });
  });

  describe('[Registration Page] Country Codes Success', () => {
    it('should return response', () => {
      const action = {
        type: '[Registration Page] Country Codes Success',
        result: [{
          name: 'Poland',
          code: 'PL',
          dial_code: '+48'
        }]
      }

      const updates = {
        ...initialValues,
        isLoading: false,
        countryCodes: [{
          name: 'Poland',
          code: 'PL',
          dial_code: '+48'
        }]
      }

      const result = countryCodesReducer(initialValues, action);
      expect(result).toEqual(updates);
    });
  });

  describe('[Registration Page] Country Codes Fail', () => {
    it('should return rejected message', () => {
      const action = {
        type: '[Registration Page] Country Codes Fail',
        message: 'A data error occurred, please try again.'
      }

      const updates = {
        ...initialValues,
        isLoading: false,
        errorMessage: 'A data error occurred, please try again.'
      }

      const result = countryCodesReducer(initialValues, action);
      expect(result).toEqual(updates);
    });
  });
});
