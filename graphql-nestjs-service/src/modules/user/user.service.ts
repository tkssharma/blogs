import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { AuthenticationError } from 'apollo-server-core'
import * as jwt from 'jsonwebtoken'
import { MongoRepository } from 'typeorm'
import { UpdateUserInput } from '../../graphql'

@Injectable()
export class UserService {
  constructor() {}

  async findAll(offset: number, limit: number): Promise<any[] | null> {
    return null
  }

  async findById(_id: string): Promise<any> {
      return null;
  }
  async create(): Promise<any> {
    return null;
  }
}
