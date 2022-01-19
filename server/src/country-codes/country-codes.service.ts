import { Injectable } from "@nestjs/common";
import { Country } from "./country-codes.interface";
import * as countryCodesData from "../../mock/data.json";

@Injectable()
export class CountryCodesService {
  readonly countryCodes: Country[] = countryCodesData;

  getAll() {
    return this.countryCodes;
  }
}