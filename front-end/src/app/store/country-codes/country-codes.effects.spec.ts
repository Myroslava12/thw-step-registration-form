import 'zone.js';
import 'zone.js/testing';
import '@angular/compiler'
import {provideMockActions } from '@ngrx/effects/testing';
import {
    BrowserDynamicTestingModule,
    platformBrowserDynamicTesting
  } from '@angular/platform-browser-dynamic/testing';
import { Action } from '@ngrx/store';
import { async, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { CountryCodesEffects } from './country-codes.effects';
import { CountryCodesStoreService } from '../../country-codes/service/country-codes-store.service';
import { HttpClientModule } from '@angular/common/http';
import { Country } from 'src/app/interfaces';
import * as countryCodesActions from './country-codes.actions';

describe('CountryCodesEffects', () => {
  let actions$: Observable<Action>;
  let effects: CountryCodesEffects;
  let httpService: CountryCodesStoreService;

  beforeAll(() => {
    TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientModule ],
      providers: [ CountryCodesEffects, provideMockActions(() => actions$), CountryCodesStoreService ]
    })
    effects = TestBed.get(CountryCodesEffects);
    httpService = TestBed.get(CountryCodesStoreService);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });


  describe('getCountryCodes$', () => {
    it('getCountryCodes$ should work', async(() => {
      let outcome: {
        type: string;
        result: Country[];
      };

      const spy = jest.spyOn(httpService, 'getCountryCodes');
      httpService.getCountryCodes().subscribe((result) => {
        outcome = {
          type: '[Registration Page] Country Codes Success',
          result
        };
      });
    
      actions$ = of(countryCodesActions.requestCountryCodes);
    
      effects.getCountryCodes$.subscribe(result => {
        expect(result).toEqual(outcome);
        expect(spy).toHaveBeenCalled();
      });
    }));
  });
});
