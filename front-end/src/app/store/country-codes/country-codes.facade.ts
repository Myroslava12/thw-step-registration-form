import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Country } from 'src/app/interfaces';
import { State } from '..';
import { requestCountryCodes } from './country-codes.actions';
import * as CountryCodesSelectors from './country-codes.selectors';

@Injectable({ providedIn: 'root' })
export class CountryCodesFacade {
  countryCodes$: Observable<Country[]>;
  isLoading$: Observable<boolean>;
  errorMessage$: Observable<string | null>;

  constructor(private store: Store<State>) {
    this.countryCodes$ = this.store.pipe(select(CountryCodesSelectors.getCountryCodes));
    this.isLoading$ = this.store.pipe(select(CountryCodesSelectors.isLoading));
    this.errorMessage$ = this.store.pipe(select(CountryCodesSelectors.errorMessage));
  }

  getCountryCodes(): void {
    this.store.dispatch(requestCountryCodes());
  }
}
