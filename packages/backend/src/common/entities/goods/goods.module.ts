import { Module } from '@nestjs/common';
import { GoodsService } from './goods.service';
import { GoodsController } from './goods.controller';
import { PrismaService } from 'nestjs-prisma';

@Module({
  controllers: [GoodsController],
  providers: [GoodsService, PrismaService],
})
export class GoodsModule {}
