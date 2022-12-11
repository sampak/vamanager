import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as express from 'express';
import { AppModule } from './app.module';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as AWS from 'aws-sdk';

AWS.config.update({ region: 'us-east-1' });

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });
  app.use(express.json({ limit: '50mb' }));
  const publicPath = join(__dirname, '../../public');
  app.useStaticAssets(publicPath, {
    prefix: '/public',
  });
  await app.listen(4000);
}
bootstrap();
