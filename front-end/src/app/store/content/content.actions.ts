import { createAction, props } from '@ngrx/store';
import { ContentResponse } from 'src/app/interfaces';

export const requestPersonalInfoContents = createAction(
  '[Registration Page] Personal Info Contents Request'
);

export const successPersonalInfoContents = createAction(
  '[Registration Page] Personal Info Contents Success',
  props<{result: ContentResponse}>()
);

export const failPersonalInfoContents = createAction(
  '[Registration Page] Personal Info Contents Fail',
  props<{ message: string }>()
);

export const requestContactInfoContents = createAction(
  '[Registration Page] Contact Info Contents Request'
);

export const successContactInfoContents = createAction(
  '[Registration Page] Contact Info Contents Success',
  props<{result: ContentResponse}>()
);

export const failContactInfoContents = createAction(
  '[Registration Page] Contact Info Contents Fail',
  props<{ message: string }>()
);
