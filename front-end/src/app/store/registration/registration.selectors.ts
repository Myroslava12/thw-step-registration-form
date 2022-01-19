import { createFeatureSelector, createSelector } from "@ngrx/store";
import { State } from "../index";
import { registrationFeatureKey, RegistrationState } from "./registration.reducer";

export const selectFeature = createFeatureSelector<State, RegistrationState>(registrationFeatureKey);

export const getFirstName = createSelector(selectFeature, (state: RegistrationState) => state.firstName);
export const getLastName = createSelector(selectFeature, (state: RegistrationState) => state.lastName);
export const getCountry = createSelector(selectFeature, (state: RegistrationState) => state.country);
export const getPhoneNumber = createSelector(selectFeature, (state: RegistrationState) => state.phoneNumber);
