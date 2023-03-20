import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCartItemDto } from './dto/create-cart-item.dto';
import { PrismaService } from 'nestjs-prisma';
import { CartItem } from '@prisma/client';

@Injectable()
export class CartItemsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAllByUser(userId: number): Promise<CartItem[]> {
    const items = await this.prisma.cartItem.findMany({
      where: { userId },
      include: { good: true },
    });
    if (!items)
      throw new NotFoundException(
        `Cart items for user with ID ${userId} is not found`,
      );
    return items;
  }

  async create(createCartItemDto: CreateCartItemDto): Promise<CartItem> {
    const { userId, goodId, quantity } = createCartItemDto;

    const good = await this.prisma.cartItem.findMany({ where: { goodId } });

    if (good)
      throw new BadRequestException('The good is already added to the cart');

    return this.prisma.cartItem.create({
      data: {
        quantity: quantity,
        good: { connect: { id: goodId } },
        user: { connect: { id: userId } },
      },
      include: { good: true },
    });
  }

  async increaseQuantity(cartItemId: number): Promise<CartItem> {
    const cartItem = await this.prisma.cartItem.findUnique({
      where: { id: cartItemId },
      include: { good: true },
    });

    if (!cartItem) {
      throw new NotFoundException(`Cart item with ID ${cartItemId} not found`);
    }

    return this.prisma.cartItem.update({
      where: { id: cartItemId },
      data: { quantity: cartItem.quantity + 1 },
    });
  }

  async decreaseQuantity(cartItemId: number): Promise<CartItem> {
    const cartItem = await this.prisma.cartItem.findUnique({
      where: { id: cartItemId },
      include: { good: true },
    });

    if (!cartItem) {
      throw new NotFoundException(`Cart item with ID ${cartItemId} not found`);
    }

    if (cartItem.quantity === 1) {
      await this.prisma.cartItem.delete({ where: { id: cartItemId } });
      throw new ConflictException(
        `Cart item with ID ${cartItemId} has been removed from the cart`,
      );
    }

    return this.prisma.cartItem.update({
      where: { id: cartItemId },
      data: { quantity: cartItem.quantity - 1 },
    });
  }

  async delete(id: number): Promise<CartItem> {
    return this.prisma.cartItem.delete({
      where: { id },
    });
  }
}
