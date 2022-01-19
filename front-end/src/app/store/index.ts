import { ActionReducerMap } from "@ngrx/store";
import { CountryCodesEffects } from "./country-codes/country-codes.effects";
import { CountryCodesFeatureKey, countryCodesReducer, CountryCodesState } from "./country-codes/country-codes.reducer";
import { RegistrationEffects } from "./registration/registration.effects";
import { registrationFeatureKey, registrationReducer, RegistrationState } from "./registration/registration.reducer";


export interface State {
  [registrationFeatureKey]: RegistrationState;
  [CountryCodesFeatureKey]: CountryCodesState;
}

export const reducers: ActionReducerMap<State> = {
  [registrationFeatureKey]: registrationReducer,
  [CountryCodesFeatureKey]: countryCodesReducer
}

export const effects = [
  RegistrationEffects,
  CountryCodesEffects
];
