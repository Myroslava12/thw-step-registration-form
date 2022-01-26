import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Content } from 'src/app/interfaces';
import { State } from '..';
import { requestContactInfoContents, requestPersonalInfoContents } from './content.actions';
import * as ContentSelectors from './content.selectors';

@Injectable({ providedIn: 'root' })
export class ContentFacade {
  personalInfoContents$: Observable<Content | null>;
  contactInfoContents$: Observable<Content | null>;
  isLoading$: Observable<boolean>;
  errorMessage$: Observable<string | null>;

  constructor(private store: Store<State>) {
    this.personalInfoContents$ = this.store.pipe(select(ContentSelectors.getPersonalInfoContents));
    this.contactInfoContents$ = this.store.pipe(select(ContentSelectors.getContactInfoContents));
    this.isLoading$ = this.store.pipe(select(ContentSelectors.isLoading));
    this.errorMessage$ = this.store.pipe(select(ContentSelectors.errorMessage));
  }

  getPersonalInfoContents(): void {
    this.store.dispatch(requestPersonalInfoContents());
  }

  getContactInfoContents(): void {
    this.store.dispatch(requestContactInfoContents());
  }
}
