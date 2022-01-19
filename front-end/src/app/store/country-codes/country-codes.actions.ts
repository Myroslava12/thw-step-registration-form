import { createAction, props } from "@ngrx/store";
import { Country } from "src/app/interfaces";


export const requestCountryCodes = createAction(
  '[Registration Page] Country Codes Request'
);

export const successCountryCodes = createAction(
  '[Registration Page] Country Codes Success',
  props<{result: Country[]}>()
);

export const failCountryCodes = createAction(
  '[Registration Page] Country Codes Fail',
  props<{ message: string }>()
);
