import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { CreateCartItemDto } from './dto/create-cart-item.dto';
import { CartItemsService } from './cart-item.service';

@Controller('cart')
export class CartItemsController {
  constructor(private readonly cartItemsService: CartItemsService) {}

  @Get(':userId')
  async findAllByUser(@Param('userId') userId: number) {
    return this.cartItemsService.findAllByUser(userId);
  }

  @Post()
  async create(@Body() createCartItemDto: CreateCartItemDto) {
    return await this.cartItemsService.create(createCartItemDto);
  }

  @Put('increase/:id')
  async increase(@Param('id') id: number) {
    return await this.cartItemsService.increaseQuantity(id);
  }

  @Put('decrease/:id')
  async decrease(@Param('id') id: number) {
    return await this.cartItemsService.decreaseQuantity(id);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return await this.cartItemsService.delete(id);
  }
}
