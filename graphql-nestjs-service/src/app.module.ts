import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { CacheService } from './config/cache/cache.service';
import { ConfigModule } from './config/config.module';
import { GraphqlService } from './config/graphql/graphql.service';
import { UserModule } from './modules/user/user.module';
import { RedisCacheModule } from './redis/redis.module';
@Module({
  imports: [
    UserModule,
    RedisCacheModule,
    GraphQLModule.forRootAsync({
      useClass: GraphqlService,
    }),
    ConfigModule,
  ],
  controllers: [],
})
export class AppModule {
}
