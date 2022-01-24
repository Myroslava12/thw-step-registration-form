import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { RegistrationFacade } from '../../store/registration/registration.facade';

@Component({
  selector: 'app-review-dialog',
  templateUrl: './review-dialog.component.html',
  styleUrls: ['./review-dialog.component.scss']
})
export class ReviewDialogComponent implements OnInit {
  firtName$: Observable<string>;
  lastName$: Observable<string>;
  country$: Observable<string>;
  phoneNumber$: Observable<string>;

  @Output() close = new EventEmitter();
  @Output() submit =new EventEmitter();

  constructor(private registrationFacade: RegistrationFacade) {
    this.firtName$ = this.registrationFacade.firstName$;
    this.lastName$ = this.registrationFacade.lastName$;
    this.country$ = this.registrationFacade.country$;
    this.phoneNumber$ = this.registrationFacade.phoneNumber$;
  }

  ngOnInit(): void {
  }

  onClose(value: boolean) {
    this.close.emit(value);
  }

  onSubmit() {
    this.submit.emit();
  }

}
