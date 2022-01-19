import { CommonModule } from "@angular/common";
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { ReviewDialogComponent } from "./review-dialog/review-dialog.component";
import { LoadingComponent } from './loading/loading.component';

@NgModule({
    declarations: [ReviewDialogComponent, LoadingComponent],
    imports: [CommonModule],
    exports: [ReviewDialogComponent, LoadingComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule {}