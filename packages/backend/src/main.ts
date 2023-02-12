import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

dotenv.config();

const logger = new Logger('Application');

const initApp = async () => {
  const app = await NestFactory.create(AppModule, { cors: true });
  const port = process.env.PORT ?? 5000;
  const host = '0.0.0.0';
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Leviathan API')
    .setDescription('The leviathan API description')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'JWT-auth',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(port, host);
  logger.log(`🚀 Application is running on: http://localhost:${port}/api`);
};

initApp();
