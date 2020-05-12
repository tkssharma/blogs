import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from './config/config.service';
import { createDocument } from './swagger/swagger';
import { SwaggerModule } from '@nestjs/swagger';

import 'reflect-metadata';
(async () => {
  const app = await NestFactory.create(AppModule, {cors: true});
  app.setGlobalPrefix('api/v1');
  const configService = app.get(ConfigService);
  SwaggerModule.setup('api', app, createDocument(app));
  await app.listen(configService.get().port);
  console.info('SERVER IS RUNNING ON PORT', configService.get().port);
})();
