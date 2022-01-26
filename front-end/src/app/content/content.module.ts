import { NgModule } from '@angular/core';
import { ContentStoreService } from './service/content-store.service';
import { ContentService } from './service/content.service';

@NgModule({
  declarations: [],
  providers: [ContentService, ContentStoreService]
})
export class ContentModule {}
