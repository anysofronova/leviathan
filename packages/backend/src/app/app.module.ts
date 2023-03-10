import {
  CacheModule,
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { UsersModule } from '../common/entities/users/users.module';
import { AuthModule } from '../common/entities/auth/auth.module';
import { DesignersModule } from '../common/entities/designers/designers.module';
import { AuthMiddleware } from '../common/guards/auth-check.guard';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { HttpModule } from '@nestjs/axios';
import { APP_GUARD } from '@nestjs/core';
import { GoodsModule } from '../common/entities/goods/goods.module';
import { PrismaModule } from 'nestjs-prisma';

@Module({
  imports: [
    ThrottlerModule.forRoot({
      ttl: 30,
      limit: 15,
    }),
    CacheModule.register({ isGlobal: true }),
    UsersModule,
    DesignersModule,
    PrismaModule,
    AuthModule,
    HttpModule,
    GoodsModule,
  ],
  providers: [{ provide: APP_GUARD, useClass: ThrottlerGuard }],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude(
        {
          path: '/auth/signup',
          method: RequestMethod.POST,
        },
        {
          path: '/auth/signin',
          method: RequestMethod.POST,
        },
        {
          path: '/auth/refresh',
          method: RequestMethod.POST,
        },
      )
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
