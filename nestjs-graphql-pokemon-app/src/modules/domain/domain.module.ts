import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config'
import * as Joi from 'joi';
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { PokemonModule } from './pokemon/pokemon.module';
import { LeagueModule } from './league/league.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('development', 'production', 'test', 'local')
          .default('development'),
        PORT: Joi.number().default(3000),
        DATABASE_URL: Joi.string().required()
      })
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          name: 'default',
          type: 'postgres',
          logging: true,
          url: configService.get('DATABASE_URL'),
          entities: [__dirname + '/**/**.entity{.ts,.js}'],
          synchronize: true
        } as TypeOrmModuleAsyncOptions;
      }
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      playground: true,
      driver: ApolloDriver,
      typePaths: ['./**/*.graphql'],
      context: ({ req }) => ({ headers: req.headers }),
      debug: true,
      definitions: {
        path: join(process.cwd(), 'src/graphql.schema.ts'),
        outputAs: 'class',
      },
    }),
    PokemonModule, LeagueModule
  ],
  controllers: [],
  providers: [],
})
export class DomainModule { }
