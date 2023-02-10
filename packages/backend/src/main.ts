import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import * as env from 'env-var';

import { AppModule } from './app.module';

const logger = new Logger('Application');

const initApp = async () => {
  const app = await NestFactory.create(AppModule);
  const port = env.get('PORT').default(4200).asPortNumber();
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Leviathan API')
    .setDescription('The leviathan API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(port);
  logger.log(`🚀 Application is running on: http://localhost:${port}`);
};

initApp();
