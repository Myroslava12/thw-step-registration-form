import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Action } from "@ngrx/store";
import { catchError, map, Observable, of, switchMap, throwError } from "rxjs";
import { CountryCodesStoreService } from "src/app/country-codes/service/country-codes-store.service";
import { Country } from "src/app/interfaces";
import * as CountryCodesActions from './country-codes.actions';

@Injectable()
export class CountryCodesEffects {
  @Effect({ dispatch: true })
  getCountryCodes = this.actions$.pipe(
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