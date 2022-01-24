import { Action, createReducer, on } from '@ngrx/store';
import * as RegistrationActions from './registration.actions';

export const registrationFeatureKey = 'registration';

export interface RegistrationState {
  firstName: string;
  lastName: string;
  country: string;
  phoneNumber: string;
}

export const initialState: RegistrationState = {
  firstName: '',
  lastName: '',
  country: '',
  phoneNumber: ''
}

const reducer = createReducer(
  initialState,
  on(RegistrationActions.successPersonalInformation, (state, { firstName, lastName }) => ({
    ...state, firstName, lastName
  })),
  on(RegistrationActions.successContactInformation, (state, { country, phoneNumber }) => ({
    ...state, country, phoneNumber
  }))
);

export const registrationReducer = (state: RegistrationState = initialState, action: Action) => reducer(state, action);
