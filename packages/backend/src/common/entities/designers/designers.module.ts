import { Module } from '@nestjs/common';
import { DesignersService } from './designers.service';
import { DesignersController } from './designers.controller';
import { PrismaService } from 'nestjs-prisma';

@Module({
  controllers: [DesignersController],
  providers: [DesignersService, PrismaService],
})
export class DesignersModule {}
