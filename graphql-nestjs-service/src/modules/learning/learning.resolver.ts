import {
  Args,
  Context,
  Mutation,
  Query,
  Resolver,
} from '@nestjs/graphql';
import { UpdateUserInput } from '../../graphql';
import {
  CreateUserInput,
  LoginResponse,
  LoginUserInput,
  User,
} from './learning.types';

import { UserService } from './learning.service';

@Resolver('User')
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => String)
  public async hello() {
    return 'world';
  }

  @Query(() => User)
  public async me(@Context('currentUser') currentUser: User) {
    return currentUser;
  }

  @Query(() => [User])
  public async users(@Args('offset') offset: number, @Args('limit') limit: number) {
    return this.userService.findAll(offset, limit);
  }

  @Query(() => User)
  public async user(@Args('_id') _id: string) {
    return this.userService.findById(_id);
  }

  @Mutation(() => User, { name: 'register' })
  public async createUser(
    @Args('input') input: CreateUserInput,
  ) {
    return  await this.userService.create();

  }
}
