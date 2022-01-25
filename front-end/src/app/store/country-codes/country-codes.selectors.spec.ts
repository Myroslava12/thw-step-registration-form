import 'zone.js';
import 'zone.js/testing';
import '@angular/compiler'
import {
    BrowserDynamicTestingModule,
    platformBrowserDynamicTesting
  } from '@angular/platform-browser-dynamic/testing';
import { State } from '../../store';
import { TestBed } from '@angular/core/testing';
import { getCountryCodes, isLoading, errorMessage } from './country-codes.selectors';

describe('Registration Selectors', () => {
  let storeState: State;

  beforeAll(() => {
    TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
  });

  beforeEach(() => {
    storeState = {
      registration: {
        firstName: 'John',
        lastName: 'Smith',
        country: 'PL',
        phoneNumber: '+48777888777'
      },
      'country-codes': {
        countryCodes: [{
          name: 'Poland',
          dial_code: '+48',
          code: 'PL'
        }],
        isLoading: false,
        errorMessage: null
      }
    }
  });

  describe('Country Codes Selectors', () => {
    it('getCountryCodes() should return country codes data', () => {
      const result = getCountryCodes(storeState);
 
      expect(result).toEqual([{
        name: 'Poland',
        dial_code: '+48',
        code: 'PL'
      }]);
    });

    it('isLoading() should return loading state', () => {
      const result = isLoading(storeState);
   
      expect(result).toBe(false);
    });

    it('errorMessage() should return error message', () => {
      const result = errorMessage(storeState);
   
      expect(result).toBe(null);
    });
  });
});
