import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from '..';
import { CountryCodesFeatureKey, CountryCodesState } from './country-codes.reducer';

export const selectFeature = createFeatureSelector<State, CountryCodesState>(CountryCodesFeatureKey);

export const getCountryCodes = createSelector(selectFeature, (state: CountryCodesState) => state.countryCodes);
export const isLoading = createSelector(selectFeature, (state: CountryCodesState) => state.isLoading);
export const errorMessage = createSelector(selectFeature, (state: CountryCodesState) => state.errorMessage);
