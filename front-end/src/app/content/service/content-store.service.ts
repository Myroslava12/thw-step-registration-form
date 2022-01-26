import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, throwError } from "rxjs";
import { ContentService } from "./content.service";

@Injectable()
export class ContentStoreService {

  constructor(private contnetService: ContentService) {}

  getPersonalInfoContents() {
    return this.contnetService.getPersonalInfoContent().pipe(
      catchError((err: HttpErrorResponse) => this.handleError(err))
    );
  }

  getContactInfoContents() {
    return this.contnetService.getContactInfoContent().pipe(
      catchError((err: HttpErrorResponse) => this.handleError(err))
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.log(error);
    return throwError('A data error occurred, please try again.')
  }
}