import { Controller, Get } from "@nestjs/common";
import { Country } from "./country-codes.interface";
import { CountryCodesService } from "./country-codes.service";


@Controller('country-codes')
export class CountryCodesController {
  constructor(private countryCodesService: CountryCodesService) {}

  @Get()
  async getAll(): Promise<Country[]> {
    return this.countryCodesService.getAll();
  }
}
