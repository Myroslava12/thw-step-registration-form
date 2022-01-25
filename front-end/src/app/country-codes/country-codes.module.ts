import { NgModule } from '@angular/core';
import { CountryCodesStoreService } from './service/country-codes-store.service';
import { CountryCodesService } from './service/country-codes.service';

@NgModule({
  declarations: [],
  providers: [CountryCodesService, CountryCodesStoreService]
})
export class CountryCodesModule {}
