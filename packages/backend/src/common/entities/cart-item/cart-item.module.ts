import { Module } from '@nestjs/common';
import { CartItemsController } from './cart-item.controller';
import { CartItemsService } from './cart-item.service';

@Module({
  controllers: [CartItemsController],
  providers: [CartItemsService],
})
export class CartItemModule {}
