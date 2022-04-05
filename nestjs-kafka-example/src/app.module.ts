import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'KAFKA',
        transport: Transport.KAFKA,
        options: {
          client: {
            brokers: ['stirred-shark-12178-us1-kafka.upstash.io:9092'],
            ssl: true,
            sasl: {
              mechanism: 'scram-sha-256',
              username: 'c3RpcnJlZC1zaGFyay0xMjE3OCR0DB_GFzlIpROvANUaUEk39UmbgVYE7y1-WRc',
              password:
                '88_ojJ3gnG24gZzspw865ebVpWvVbfSOIjXwStzaN4ejQmku6iha6HJafezawrSFOIACTw==',
            },
          },
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
