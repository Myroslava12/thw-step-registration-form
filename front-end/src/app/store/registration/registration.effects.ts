import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { map, Observable, tap } from 'rxjs';
import * as RegistrationActions from './registration.actions';

@Injectable()
export class RegistrationEffects{
  @Effect({ dispatch: true })
  postPersonalInfo$: Observable<Action> = this.actions$.pipe(
    ofType(RegistrationActions.requestPersonalInformation),
    map((data) => {
      return RegistrationActions.successPersonalInformation(data);
    })
  );

  @Effect({dispatch: true})
  postContactInfo$: Observable<Action> = this.actions$.pipe(
    ofType(RegistrationActions.requestContactInformation),
    map((data) => {
      return RegistrationActions.successContactInformation(data);
    })
  );

  @Effect({ dispatch: false })
  redirectToContactPage$ = this.actions$.pipe(
    ofType(RegistrationActions.successPersonalInformation),
    tap(() => this.router.navigate(['/contact-information']))
  )

  constructor(private actions$: Actions, private router: Router) {}
}