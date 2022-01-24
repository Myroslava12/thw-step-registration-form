import 'zone.js';
import 'zone.js/testing';
import "@angular/compiler"
import {provideMockActions } from '@ngrx/effects/testing';
import {
    BrowserDynamicTestingModule,
    platformBrowserDynamicTesting
  } from '@angular/platform-browser-dynamic/testing';
import { Action } from '@ngrx/store';
import { async, TestBed } from '@angular/core/testing';
import { APP_BASE_HREF } from '@angular/common';
import { Observable, of } from 'rxjs';
import { RegistrationEffects } from './registration.effects';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { routes } from '../../app-routing.module';
import { ContactInformationModule } from '../../components/contact-information/contact-information.module';

describe('RegistrationEffects', () => {
  let actions$: Observable<Action>;
  let registrationEffects: RegistrationEffects;
  let router: Router;

  beforeAll(() => {
    TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ ContactInformationModule, BrowserDynamicTestingModule, RouterTestingModule.withRoutes(routes)],
      providers: [RegistrationEffects, provideMockActions(() => actions$),
        { provide: APP_BASE_HREF, useValue : '/' }
      ]
    })
    registrationEffects = TestBed.get(RegistrationEffects);
    router = TestBed.get(Router);
    router.initialNavigation();
  });

  it('should be created', () => {
    expect(registrationEffects).toBeTruthy();
  });

  describe('postPersonalInfo$', () => {
    it('postPersonalInfo should work', async(() => {
        const action = {
          type: '[Registration Page] Personal Info Request',
          firstName: 'John',
          lastName: 'Smith'
        }
    
        const outcome = {
          ...action,
          type: '[Registration Page] Personal Info Success'
        }
    
        actions$ = of(action);
    
        registrationEffects.postPersonalInfo$.subscribe(result => {
            expect(result).toEqual(outcome);
        });
      }));
  });
  
  describe('postContactInfo$', () => {
    it('should save contact information to store', () => {
      const action = {
        type: '[Registration Page] Contact Info Request',
        country: 'PL',
        phoneNumber: '+48777888777'
      }
      const outcome = {
        ...action,
        type: '[Registration Page] Contact Info Success'
      }

      actions$ = of(action);

      registrationEffects.postContactInfo$.subscribe(result => {
        expect(result).toEqual(outcome);
      });
    });
  });

  it('redirectToContactPage$ should work', () => {
    actions$ = of({
      type: '[Registration Page] Personal Info Success',
      firstName: 'John',
      lastName: 'Smith'
    });

    jest.spyOn(router, 'navigate');

    registrationEffects.redirectToContactPage$.subscribe(() => {
        expect(router.navigate).toHaveBeenCalledWith('/contact-information');
    });
  });
});
