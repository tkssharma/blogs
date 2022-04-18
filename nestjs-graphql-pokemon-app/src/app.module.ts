import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DomainModule } from './modules/domain/domain.module';

@Module({
  imports: [DomainModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
