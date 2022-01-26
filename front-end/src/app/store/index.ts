import { ActionReducerMap } from '@ngrx/store';
import { ContentsEffects } from './content/content.effects';
import { contentReducer, ContentsFeatureKey, ContentState } from './content/content.reducer';
import { CountryCodesEffects } from './country-codes/country-codes.effects';
import { CountryCodesFeatureKey, countryCodesReducer, CountryCodesState } from './country-codes/country-codes.reducer';
import { RegistrationEffects } from './registration/registration.effects';
import { registrationFeatureKey, registrationReducer, RegistrationState } from './registration/registration.reducer';


export interface State {
  [registrationFeatureKey]: RegistrationState;
  [CountryCodesFeatureKey]: CountryCodesState;
  [ContentsFeatureKey]: ContentState;
}

export const reducers: ActionReducerMap<State> = {
  [registrationFeatureKey]: registrationReducer,
  [CountryCodesFeatureKey]: countryCodesReducer,
  [ContentsFeatureKey]: contentReducer
}

export const effects = [
  RegistrationEffects,
  CountryCodesEffects,
  ContentsEffects
];
