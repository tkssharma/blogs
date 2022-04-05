import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): any {
    return {user:'mert',message:'deneme',age:32}
  }
}
