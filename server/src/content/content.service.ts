import { Injectable } from "@nestjs/common";
import * as personalInfoContentData from "../../mock/personal-info-content.json";
import * as contactInfoContentData from "../../mock/contact-info-content.json";
import { ContendData } from "./content.interface";

@Injectable()
export class ContentService {
  readonly personalInfoContentData: ContendData = {
    content: personalInfoContentData
  };

  readonly contactInfoContentData: ContendData = {
    content: contactInfoContentData
  };

  getPersonalInfoContent() {
    return this.personalInfoContentData;
  }

  getContactInfoContent() {
    return this.contactInfoContentData;
  }
}