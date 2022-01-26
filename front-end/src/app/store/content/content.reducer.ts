import { Action, createReducer, on } from '@ngrx/store';
import { Content } from 'src/app/interfaces';
import * as ContentActions from './content.actions';

export const ContentsFeatureKey = 'contents';

export interface ContentState {
  personalInfoContents: Content | null;
  contactInfoContents: Content | null;
  isLoading: boolean;
  errorMessage: string | null;
}

const initialState: ContentState = {
  personalInfoContents: null,
  contactInfoContents: null,
  isLoading: false,
  errorMessage: null
}

const reducer = createReducer(
  initialState,
  on(ContentActions.requestPersonalInfoContents, (state) => ({
    ...state, isLoading: true, errorMessage: null
  })),
  on(ContentActions.successPersonalInfoContents, (state, { result }) => ({
    ...state, isLoading: false, personalInfoContents: { ...result.content }
  })),
  on(ContentActions.failPersonalInfoContents, (state, { message }) => ({
    ...state, isLoading: false, errorMessage: message
  })),
  on(ContentActions.requestContactInfoContents, (state) => ({
    ...state, isLoading: true, errorMessage: null
  })),
  on(ContentActions.successContactInfoContents, (state, { result }) => ({
    ...state, isLoading: false, contactInfoContents: { ...result.content }
  })),
  on(ContentActions.failContactInfoContents, (state, { message }) => ({
    ...state, isLoading: false, errorMessage: message
  }))
);

export const contentReducer = (state: ContentState = initialState, action: Action) => reducer(state, action);
