import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from '..';
import { ContentsFeatureKey, ContentState } from './content.reducer';

export const selectFeature = createFeatureSelector<State, ContentState>(ContentsFeatureKey);

export const getPersonalInfoContents = createSelector(selectFeature, (state: ContentState) => state.personalInfoContents);
export const getContactInfoContents = createSelector(selectFeature, (state: ContentState) => state.contactInfoContents);
export const isLoading = createSelector(selectFeature, (state: ContentState) => state.isLoading);
export const errorMessage = createSelector(selectFeature, (state: ContentState) => state.errorMessage);
