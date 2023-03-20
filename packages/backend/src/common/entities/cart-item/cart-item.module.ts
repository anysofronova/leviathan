import { Module } from '@nestjs/common';
import { CartItemsController } from './cart-item.controller';
import { CartItemsService } from './cart-item.service';
import { PrismaService } from 'nestjs-prisma';

@Module({
  controllers: [CartItemsController],
  providers: [CartItemsService, PrismaService],
})
export class CartItemModule {}
