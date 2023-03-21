import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { OrderService } from './order.service';
import {
  ApiBadRequestResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Order } from '@prisma/client';
import { CreateOrderDto } from './dto/create-order.dto';

@ApiTags('Order')
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @ApiResponse({
    status: 201,
    description: 'The order has been successfully created.',
  })
  @ApiOperation({
    summary: 'Create a new order',
    description: 'Create a new order',
  })
  @ApiBadRequestResponse({
    description: 'Invalid input or order already exists.',
  })
  @Post()
  async create(@Body() dto: CreateOrderDto): Promise<Order> {
    return this.orderService.createOrder(dto);
  }

  @ApiResponse({
    status: 200,
    description: 'Returns all orders for the given user.',
  })
  @ApiOperation({
    summary: 'All orders for the given user.',
    description: 'All orders for the given user.',
  })
  @ApiQuery({ name: 'userId', type: Number })
  @Get()
  async findAll(
    @Query('userId', ParseIntPipe) userId: number,
  ): Promise<Order[]> {
    return this.orderService.findAll(userId);
  }

  @ApiResponse({
    status: 200,
    description: 'Returns the order with the given ID.',
  })
  @ApiOperation({
    summary: 'Returns the order with the given ID.',
    description: 'Returns the order with the given ID.',
  })
  @ApiParam({ name: 'orderId', type: Number })
  @Get(':orderId')
  async findOne(
    @Param('orderId', ParseIntPipe) orderId: number,
  ): Promise<Order> {
    return this.orderService.findOne(orderId);
  }
}
