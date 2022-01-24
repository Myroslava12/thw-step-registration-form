import 'zone.js';
import 'zone.js/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewDialogComponent } from './review-dialog.component';
import {
    BrowserDynamicTestingModule,
    platformBrowserDynamicTesting
  } from "@angular/platform-browser-dynamic/testing";
import { RegistrationFacade } from '../../store/registration/registration.facade';
import { StoreModule } from '@ngrx/store';
import { reducers } from '../../store';

describe('ReviewComponent', () => {
  let component: ReviewDialogComponent;
  let fixture: ComponentFixture<ReviewDialogComponent>;

  beforeAll(() => {
    TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
  });
  beforeEach(async () => {
    await TestBed.configureTestingModule({
        imports: [StoreModule.forRoot(reducers)],
      declarations: [ ReviewDialogComponent ],
      providers: [RegistrationFacade]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should test the close emitter with a simple subscribe', () => {
    component.onClose(false);
    component.close.subscribe((value) => {
        expect(value).toEqual(false);
    });
  });
});
