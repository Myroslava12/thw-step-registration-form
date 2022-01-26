import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ContentResponse } from '../../interfaces';

@Injectable({ providedIn: 'root' })
export class ContentService {
  
  constructor(private http: HttpClient) {}

  getPersonalInfoContent() {
    return this.http.get<ContentResponse>('http://localhost:3000/content/personal-info');
  }

  getContactInfoContent() {
    return this.http.get<ContentResponse>('http://localhost:3000/content/contact-info');
  }
}
