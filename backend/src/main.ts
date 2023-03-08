import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as express from 'express';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as AWS from 'aws-sdk';
import * as Sentry from '@sentry/node';
AWS.config.update({ region: 'us-east-1' });

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  Sentry.init({
    dsn: 'https://09f150fe33594ba28bb08d8fe16a6d52@o1074129.ingest.sentry.io/4504619063443456',
  });
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });
  app.use(express.json({ limit: '50mb' }));
  console.log('Server listen on: ' + process.env.PORT);
  await app.listen(process.env.PORT);
}
bootstrap();
