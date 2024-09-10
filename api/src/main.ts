import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import type { NestExpressApplication } from '@nestjs/platform-express';
import helmet from 'helmet';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    abortOnError: process.env?.NODE_ENV === 'production' ? true : false,
    rawBody: true,
  });

  app.use(helmet());

  app.enableCors();

  app.useBodyParser('json', { limit: '10mb' });

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}

bootstrap();
