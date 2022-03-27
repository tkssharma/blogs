import { Controller, Get, Query } from '@nestjs/common';
import { QueryDto } from './app.dto';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(@Query() query: QueryDto): QueryDto {
    console.log({ query });

    return query;
  }
}
