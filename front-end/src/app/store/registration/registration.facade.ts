import { Injectable } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { ContactInformation, PersonalInformation } from "src/app/interfaces";
import { State } from "..";
import { requestContactInformation, requestPersonalInformation } from "./registration.actions";
import * as RegistrationSelectors from './registration.selectors';

@Injectable({
  providedIn: 'root'
})
export class RegistrationFacade {
  firstName$: Observable<string>;
  lastName$: Observable<string>;
  country$: Observable<string>;
  phoneNumber$: Observable<string>;

  constructor(private store: Store<State>) {
    this.firstName$ = this.store.pipe(select(RegistrationSelectors.getFirstName));
    this.lastName$ = this.store.pipe(select(RegistrationSelectors.getLastName));
    this.country$ = this.store.pipe(select(RegistrationSelectors.getCountry));
    this.phoneNumber$ = this.store.pipe(select(RegistrationSelectors.getPhoneNumber));
  }

  postPersonalInformation(personalData: PersonalInformation): void {
    this.store.dispatch(requestPersonalInformation({ ...personalData }));
  }

  postContactInformation(contactData: ContactInformation): void {
    this.store.dispatch(requestContactInformation({ ...contactData }));
  }
}
