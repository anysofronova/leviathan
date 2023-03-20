import { Body, Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { OrderService } from './order.service';
import { ApiTags } from '@nestjs/swagger';
import { Order } from '@prisma/client';
import { CreateOrderDto } from './dto/create-order.dto';

@ApiTags('Order')
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  async create(@Body() dto: CreateOrderDto): Promise<Order> {
    return this.orderService.createOrder(dto);
  }

  @Get()
  async findAll(
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<Order[]> {
    return this.orderService.findAll(userId);
  }

  @Get(':orderId')
  async findOne(
    @Param('orderId', ParseIntPipe) orderId: number,
  ): Promise<Order> {
    return this.orderService.findOne(orderId);
  }
}
