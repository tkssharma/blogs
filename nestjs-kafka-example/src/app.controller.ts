import { Body, Controller, Inject, Logger, Post } from '@nestjs/common';
import { ClientProxy, MessagePattern, Payload } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject('KAFKA')
    private readonly kafka: ClientProxy,
  ) {}

  //GET ORDERS
  @MessagePattern('GET_USERS')
  public GetUsers(@Payload() payload: any) {
    Logger.log(payload.value, AppController.name);
    return this.kafka.emit('PRINT_USERS',{
      message:payload.value.message,
      user:payload.value.user
    })
  }

  //VALİDATE
  @MessagePattern('PRINT_USERS')
  public Validate(@Payload() payload: any) {
    Logger.log(payload.value, AppController.name);
    console.log({
      message:payload.value.message,
      user:payload.value.user
    })
  }

  @Post('/')
  public sendMessage(
    @Body('message') message: string,
    @Body('user') user: string,
  ) {
    return firstValueFrom(
      this.kafka.emit('GET_USERS', {
        message,
        user,
      }),
    );
  }
}
