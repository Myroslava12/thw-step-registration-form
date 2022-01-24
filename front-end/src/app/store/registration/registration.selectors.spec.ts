import 'zone.js';
import 'zone.js/testing';
import "@angular/compiler"
import {
    BrowserDynamicTestingModule,
    platformBrowserDynamicTesting
  } from "@angular/platform-browser-dynamic/testing";
import { State } from '../../store';
import { TestBed } from '@angular/core/testing';
import { getCountry, getFirstName, getLastName, getPhoneNumber, getRegistrationData } from './registration.selectors';

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
      "country-codes": {
        countryCodes: [],
        isLoading: false,
        errorMessage: null
      }
    }
  });

  describe('Registration Selectors', () => {
    it('getFirstName() should return first name', () => {
      const result = getFirstName(storeState);
 
      expect(result).toBe('John');
    });

    it('getLastName() should return last name', () => {
      const result = getLastName(storeState);
   
      expect(result).toBe('Smith');
    });

    it('getCountry() should return country code', () => {
      const result = getCountry(storeState);
   
      expect(result).toBe('PL');
    });

    it('getPhoneNumber() should return phone number', () => {
      const result = getPhoneNumber(storeState);
   
      expect(result).toBe('+48777888777');
    });

    it('getRegistrationData() should return registration values', () => {
      const result = getRegistrationData(storeState);
   
      expect(result).toBe(storeState.registration);
    });
  });
});
