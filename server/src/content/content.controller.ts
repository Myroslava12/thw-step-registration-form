import { Controller, Get } from "@nestjs/common";
import { ContendData } from "./content.interface";
import { ContentService } from "./content.service";


@Controller('content/personal-info')
export class PersonalInfoContentController {
  constructor(private contentService: ContentService) {}

  @Get()
  async getAll(): Promise<ContendData> {
    return this.contentService.getPersonalInfoContent();
  }
}

@Controller('content/contact-info')
export class ContactInfoContentController {
  constructor(private contentService: ContentService) {}

  @Get()
  async getAll(): Promise<ContendData> {
    return this.contentService.getContactInfoContent();
  }
}
