import { CommonModule } from "@angular/common";
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../../shared/shared.module";
import { ContactInformationComponent } from "./contact-information.component";

@NgModule({
    declarations: [ContactInformationComponent],
    imports: [
      SharedModule,
      CommonModule,
      ReactiveFormsModule,
      RouterModule.forChild([
        {
          path: '',
          component: ContactInformationComponent
        }
      ])],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    exports: [ContactInformationComponent]
})
export class ContactInformationModule {}
