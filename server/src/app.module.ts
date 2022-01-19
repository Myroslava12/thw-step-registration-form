import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { CountryCodesController } from './country-codes/country-codes.controller';
import { CountryCodesService } from './country-codes/country-codes.service';

@Module({
  imports: [],
  controllers: [CountryCodesController],
  providers: [CountryCodesService],
})
export class AppModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply()
      .forRoutes(
        { path: '/country-codes', method: RequestMethod.GET },
      );
  }
}
