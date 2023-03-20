import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { Good, Order } from '@prisma/client';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrderService {
  constructor(private readonly prisma: PrismaService) {}
  async createOrder(dto: CreateOrderDto): Promise<Order> {
    const { userId, ...rest } = dto;
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new Error(`User with ID ${userId} not found`);
    }

    for (const { id } of dto.goods) {
      const item: Good = await this.prisma.good.findUnique({
        where: { id },
      });

      if (!item) throw new Error(`Good with ID ${id} not found`);

      if (item.status === 'UNAVAILABLE')
        throw new Error(`Good with ID ${id} is unavailable`);
    }

    return this.prisma.order.create({
      data: {
        user: { connect: { id: userId } },
        ...rest,
      },
    });
  }

  async findAll(userId: number) {
    const orders = await this.prisma.order.findMany({
      where: { userId },
    });

    if (!orders || orders.length === 0) {
      throw new NotFoundException(`No orders found for user ID ${userId}`);
    }

    return orders;
  }

  async findOne(id: number) {
    const order = await this.prisma.order.findUnique({
      where: { id },
    });

    if (!order) {
      throw new NotFoundException(`Order is not found`);
    }

    return order;
  }
}
