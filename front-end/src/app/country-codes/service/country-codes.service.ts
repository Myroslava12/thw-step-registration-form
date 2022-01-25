import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Country } from '../../interfaces';

@Injectable({ providedIn: 'root' })
export class CountryCodesService {
  
  constructor(private http: HttpClient) {}

  getCountryCodes() {
    return this.http.get<Country[]>('http://localhost:3000/country-codes');
  }
}
