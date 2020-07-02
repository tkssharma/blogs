import { DynamicModule, Module } from '@nestjs/common';
import { RedisModule, RedisModuleOptions} from 'nestjs-redis';
import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/config.service';
import { CacheService } from './redis.service';

@Module({})
export class RedisCacheModule {

  public static getRedisOption(config: ConfigService): RedisModuleOptions {
    const redis = config.get().redis;
    if (!redis) {
      throw new Error('redis config is missing');
    }
    console.log(redis);
    return redis;
  }

  public static forRoot(): DynamicModule {
    return {
      module: RedisCacheModule,
      imports: [
        RedisModule.forRootAsync({
          imports: [ConfigModule],
          useFactory: (configService: ConfigService) => RedisCacheModule.getRedisOption(configService),
          inject: [ConfigService],
      }),
      ],
      controllers: [],
      providers: [CacheService],
      exports: [CacheService],
    };
  }
}
