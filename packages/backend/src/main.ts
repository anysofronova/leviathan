import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import * as env from 'env-var';

const logger = new Logger('Application');

const initApp = async () => {
  const app = await NestFactory.create(AppModule);
  const port = env.get('PORT').default(4200).asPortNumber();
  await app.listen(port);
  logger.log(`🚀 Application is running on: http://localhost:${port}`);
};

initApp();
