import { Module } from '@nestjs/common';
import { ContactController } from './app/controllers/contact.controller';
import { EntityModule } from './app/module/entity.module';
import { ConfigModule } from './config/config.module';
@Module({
  imports: [
    ConfigModule,
    EntityModule
  ],
  controllers: [ContactController]
})
export class AppModule {
}
