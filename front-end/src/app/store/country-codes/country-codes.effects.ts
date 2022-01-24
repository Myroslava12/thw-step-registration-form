import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap } from "rxjs";
import { CountryCodesStoreService } from "../../country-codes/service/country-codes-store.service";
import { Country } from "src/app/interfaces";
import * as CountryCodesActions from './country-codes.actions';

@Injectable()
export class CountryCodesEffects {
  @Effect({ dispatch: true })
  getCountryCodes$ = this.actions$.pipe(
    ofType(CountryCodesActions.requestCountryCodes),
    switchMap(() =>
      this.countryCodesStoreService.getCountryCodes().pipe(
        map((response: Country[]) => {
          return  CountryCodesActions.successCountryCodes({ result: response });
        })
      )
    ),
    catchError((err) => of(CountryCodesActions.failCountryCodes({message: err})))
  )
  
  constructor(private actions$: Actions, private countryCodesStoreService: CountryCodesStoreService) {}
}