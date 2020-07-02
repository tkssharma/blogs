import { Global, Module } from '@nestjs/common';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

@Global()
@Module({
  providers: [UserResolver, UserService],
  exports: [UserService],
})
export class UserModule {}
