import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { PersonalInfoContentController, ContactInfoContentController } from './content/content.controller';
import { ContentService } from './content/content.service';
import { CountryCodesController } from './country-codes/country-codes.controller';
import { CountryCodesService } from './country-codes/country-codes.service';

@Module({
  imports: [],
  controllers: [CountryCodesController, PersonalInfoContentController, ContactInfoContentController],
  providers: [CountryCodesService, ContentService],
})
export class AppModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply()
      .forRoutes(
        { path: '/country-codes', method: RequestMethod.GET },
        { path: '/content/personal-info', method: RequestMethod.GET },
        { path: '/content/contact-info', method: RequestMethod.GET }
      );
  }
}
