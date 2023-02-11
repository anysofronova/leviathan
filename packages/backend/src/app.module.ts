import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AtGuard } from './common/guards';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [AuthModule, PrismaModule],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AtGuard,
    },
  ],
})
export class AppModule {}
