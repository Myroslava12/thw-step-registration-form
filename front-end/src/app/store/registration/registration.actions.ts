import { Action, createAction, props } from '@ngrx/store';
import { ContactInformation, PersonalInformation } from 'src/app/interfaces';

export const requestPersonalInformation = createAction(
  '[Registration Page] Personal Info Request',
  props<PersonalInformation>()
)

export const successPersonalInformation = createAction(
  '[Registration Page] Personal Info Success',
  props<PersonalInformation>()
);

export const requestContactInformation = createAction(
  '[Registration Page] Contact Info Request',
  props<ContactInformation>()
);

export const successContactInformation = createAction(
  '[Registration Page] Contact Info Success',
  props<ContactInformation>()
);
