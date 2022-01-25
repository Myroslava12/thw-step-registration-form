import { Action, createReducer, on } from '@ngrx/store';
import { Country } from 'src/app/interfaces';
import * as CountryCodesActions from './country-codes.actions';

export const CountryCodesFeatureKey = 'country-codes';

export interface CountryCodesState {
  countryCodes: Country[];
  isLoading: boolean;
  errorMessage: string | null;
}

const initialState: CountryCodesState = {
  countryCodes: [],
  isLoading: false,
  errorMessage: null
}

const reducer = createReducer(
  initialState,
  on(CountryCodesActions.requestCountryCodes, (state) => ({
    ...state, isLoading: true, errorMessage: null
  })),
  on(CountryCodesActions.successCountryCodes, (state, { result }) => ({
    ...state, isLoading: false, countryCodes: [...result]
  })),
  on(CountryCodesActions.failCountryCodes, (state, { message }) => ({
    ...state, isLoading: false, errorMessage: message
  }))
);

export const countryCodesReducer = (state: CountryCodesState = initialState, action: Action) => reducer(state, action);
