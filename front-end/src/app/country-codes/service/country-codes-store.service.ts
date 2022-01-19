import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, throwError } from "rxjs";
import { CountryCodesService } from "./country-codes.service";

@Injectable()
export class CountryCodesStoreService {

  constructor(private countryCodesService: CountryCodesService) {}

  getCountryCodes() {
    return this.countryCodesService.getCountryCodes().pipe(
      catchError((err: HttpErrorResponse) => this.handleError(err))
    )
  }

  private handleError(error: HttpErrorResponse) {
    console.log(error);
    return throwError('A data error occurred, please try again.')
  }
}