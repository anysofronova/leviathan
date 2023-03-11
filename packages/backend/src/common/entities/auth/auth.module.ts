import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { AccessTokenStrategy } from './strategies/access-token.strategy';
import { RefreshTokenStrategy } from './strategies/refresh-token.strategy';
import { AccessTokenGuard } from '../../guards/access-token.guard';
import { UsersModule } from '../users/users.module';
import { HttpModule } from '@nestjs/axios';
import { PrismaService } from 'nestjs-prisma';

@Module({
  imports: [JwtModule.register({}), UsersModule, HttpModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    AccessTokenStrategy,
    RefreshTokenStrategy,
    AccessTokenGuard,
    PrismaService,
  ],
  exports: [AuthService],
})
export class AuthModule {}
