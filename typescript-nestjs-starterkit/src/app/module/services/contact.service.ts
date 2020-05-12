import { Injectable, InternalServerErrorException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import ContactEntity from '../entity/contact.entity';
import { Repository } from 'typeorm';
import * as path from 'path';
import { ContactDto } from '../dto/contact.dto';

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(ContactEntity)
    private contactRepository: Repository<ContactEntity>,
  ) {}

  findAll(): Promise<ContactEntity []> {
    return this.contactRepository.find();
  }

  async create(data: ContactDto): Promise<ContactEntity> {
    try {
    const exisitngContact = await this.findOneByEmail(data.email);
    console.log(exisitngContact);
    if (exisitngContact) {
      throw new BadRequestException('Contact already Exist');
    }
    const contact = new ContactEntity();
    contact.email = data.email;
    contact.phone = data.phone;
    contact.name = data.name;
    return  await this.contactRepository.save(contact);
    } catch (err) {
     throw new BadRequestException(err);
    }
  }

  async findOne(id: string): Promise<ContactEntity> {
    return this.contactRepository.findOne(id);
  }

  async findOneByEmail(email: string): Promise<ContactEntity> {
    return await this.contactRepository.findOne({ email });
  }

  async remove(id: string): Promise<void> {
    await this.contactRepository.delete(id);
  }
}
