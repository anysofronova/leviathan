import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class OrderService {
  constructor(private readonly prisma: PrismaService) {}
  create(createOrderDto: CreateOrderDto) {
    console.log(createOrderDto);
    return 'This action adds a new order';
  }

  findAll() {
    return `This action returns all order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
