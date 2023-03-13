import { Module } from '@nestjs/common';
import { GoodsService } from './goods.service';
import { GoodsController } from './goods.controller';
import { PrismaService } from 'nestjs-prisma';
import { DesignersService } from '../designers/designers.service';

@Module({
  controllers: [GoodsController],
  providers: [GoodsService, PrismaService, DesignersService],
})
export class GoodsModule {}
