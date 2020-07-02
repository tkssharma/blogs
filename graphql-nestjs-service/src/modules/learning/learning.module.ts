import { Global, Module } from '@nestjs/common';
import { UserResolver } from './learning.resolver';
import { UserService } from './learning.service';

@Global()
@Module({
  providers: [UserResolver, UserService],
  exports: [UserService],
})
export class UserModule {}
