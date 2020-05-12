import { Controller, Get, Post, Body } from '@nestjs/common';
import { ContactDto} from '../module/dto/'
import { ContactService } from '../module/services/contact.service';
@Controller('/')
export class ContactController {
  constructor(private readonly contactservise: ContactService){

  }
  @Get('/health')
  getHealthCheck() {
    return {
      status: 'ok'
    };
  }
  @Post('/contact')
  async createContacts(@Body() conatctDto: ContactDto) {
    return this.contactservise.create(conatctDto);
  }

  @Get('/contact')
  async getListOfcontacts() {
    return this.contactservise.findAll();
  }
}
