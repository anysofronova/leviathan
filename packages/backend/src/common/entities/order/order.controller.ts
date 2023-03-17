import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { ApiTags } from '@nestjs/swagger';
import { Order, Prisma } from '@prisma/client';

@ApiTags('Order')
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  async create(
    @Param('userId') userId: number,
    @Body() body: Prisma.OrderCreateInput,
  ): Promise<Order> {
    return this.orderService.createOrder(userId, body);
  }

  @Get()
  async findAll(
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<Order[]> {
    return this.orderService.findAll(userId);
  }

  @Delete(':orderId')
  async removeOrder(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('orderId', ParseIntPipe) orderId: number,
  ): Promise<void> {
    return this.orderService.removeOrder(userId, orderId);
  }
}
