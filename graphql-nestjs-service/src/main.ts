import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import 'reflect-metadata';
import { AppModule } from './app.module';
import { ConfigService } from './config/config.service';
import {createDocument} from './swagger/swagger';
import * as dotenv from 'dotenv';

dotenv.config();

(async () => {
  async function bootstrap() {
    const app = await NestFactory.create(AppModule, {cors: true});
    app.setGlobalPrefix('api/v1');
    const configService = app.get(ConfigService);
    SwaggerModule.setup('api', app, createDocument(app));
    await app.listen(configService.get().port);
    console.info('SERVER IS RUNNING ON PORT', configService.get().port);
  }
  bootstrap();

})();
