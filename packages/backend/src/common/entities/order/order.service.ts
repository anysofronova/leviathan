import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { Order, Prisma } from '@prisma/client';

@Injectable()
export class OrderService {
  constructor(private readonly prisma: PrismaService) {}
  async createOrder(
    userId: number,
    data: Prisma.OrderCreateInput,
  ): Promise<Order> {
    const { goodId } = data;
    const user = await this.prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
      throw new Error(`User with ID ${userId} not found`);
    }

    const good = await this.prisma.good.findUnique({
      where: { id: goodId },
    });

    if (!good) {
      throw new Error(`Good with ID ${goodId} not found`);
    }

    return this.prisma.order.create({
      data: {
        user: { connect: { id: userId } },
        goods: {
          connect: { id: goodId },
        },
        ...data,
      },
    });
  }

  async findAll(userId: number) {
    const orders = await this.prisma.order.findMany({
      where: { userId },
      include: { goods: true },
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
