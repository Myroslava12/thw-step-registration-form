import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { ContentResponse } from 'src/app/interfaces';
import * as ContentActions from './content.actions';
import { ContentStoreService } from 'src/app/content/service/content-store.service';

@Injectable()
export class ContentsEffects {
  @Effect({ dispatch: true })
  getPersonalInfoContents$ = this.actions$.pipe(
    ofType(ContentActions.requestPersonalInfoContents),
    switchMap(() =>
      this.contentStoreService.getPersonalInfoContents().pipe(
        map((response: ContentResponse) => {
          return  ContentActions.successPersonalInfoContents({ result: response });
        })
      )
    ),
    catchError((err) => of(ContentActions.failPersonalInfoContents({ message: err })))
  );

  @Effect({ dispatch: true })
  getContactInfoContents$ = this.actions$.pipe(
    ofType(ContentActions.requestContactInfoContents),
    switchMap(() =>
      this.contentStoreService.getContactInfoContents().pipe(
        map((response: ContentResponse) => {
          return  ContentActions.successContactInfoContents({ result: response });
        })
      )
    ),
    catchError((err) => of(ContentActions.failContactInfoContents({ message: err })))
  );
  
  constructor(private actions$: Actions, private contentStoreService: ContentStoreService) {}
}