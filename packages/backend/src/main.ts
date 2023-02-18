import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import * as env from 'env-var';
import * as cookieParser from 'cookie-parser';
import * as dotenv from 'dotenv';
import {
  ExpressAdapter,
  NestExpressApplication,
} from '@nestjs/platform-express';
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerModule,
} from '@nestjs/swagger';

dotenv.config();

const logger = new Logger('Application');
const initApp = async () => {
  const origin = env.get('ORIGIN').asString();
  const port = env.get('PORT').asInt();
  const host = env.get('HOST').asString();
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    new ExpressAdapter(),
    {
      logger: ['error', 'warn', 'log'],
    },
  );
  const corsOrigin = {
    origin,
    credentials: true,
  };
  app.enableCors(corsOrigin);
  app.use(cookieParser());
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
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
  const swaggerOptions: SwaggerCustomOptions = {
    swaggerOptions: {
      tagsSorter: 'alpha',
      operationsSorter: 'alpha',
    },
  };
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, swaggerOptions);

  await app.listen(port, host);
  logger.log(`🚀 Application is running on: http://localhost:${port}/api`);
};

initApp();
