import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';

import * as env from 'env-var';

import { AppModule } from './app.module';

const logger = new Logger('Application');

const initApp = async () => {
  const app = await NestFactory.create(AppModule);
  const port = env.get('PORT').default(4200).asPortNumber();
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(port);
  logger.log(`🚀 Application is running on: http://localhost:${port}`);
};

initApp();
