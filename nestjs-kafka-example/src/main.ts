import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice({
    transport: Transport.KAFKA,
    options: {
      subscribe: {
        fromBeginning: true,
      },
      consumer: {
        groupId: 'kafka-consumer',
      },
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
  } as MicroserviceOptions);

  app.startAllMicroservices();

  await app.listen(3000);
}
bootstrap();
