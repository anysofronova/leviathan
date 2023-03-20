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
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { cartItemSchema, cartItemsSchema } from './schemas';

@Controller('cart')
@ApiTags('Cart')
export class CartItemsController {
  constructor(private readonly cartItemsService: CartItemsService) {}

  @Get(':userId')
  @ApiOkResponse({
    description: 'Returns all cart items for the given user.',
    schema: cartItemsSchema,
  })
  @ApiNotFoundResponse({
    description: 'No cart items were found for the given user.',
  })
  @ApiInternalServerErrorResponse({
    description: 'An error occurred while processing the request.',
  })
  async findAllByUser(@Param('userId') userId: number) {
    return this.cartItemsService.findAllByUser(userId);
  }

  @Post()
  @ApiCreatedResponse({
    description: 'The cart item has been successfully created.',
    schema: cartItemSchema,
  })
  @ApiBadRequestResponse({ description: 'The given request data is invalid.' })
  @ApiConflictResponse({
    description: 'The good is already added to the cart.',
  })
  @ApiInternalServerErrorResponse({
    description: 'An error occurred while processing the request.',
  })
  async create(@Body() createCartItemDto: CreateCartItemDto) {
    return await this.cartItemsService.create(createCartItemDto);
  }

  @Put('increase/:id')
  @ApiOkResponse({
    description: 'The quantity of the given cart item has been increased by 1.',
    schema: cartItemSchema,
  })
  @ApiNotFoundResponse({ description: 'The given cart item was not found.' })
  @ApiInternalServerErrorResponse({
    description: 'An error occurred while processing the request.',
  })
  async increase(@Param('id') id: number) {
    return await this.cartItemsService.increaseQuantity(id);
  }

  @Put('decrease/:id')
  @ApiOkResponse({
    description: 'The quantity of the given cart item has been decreased by 1.',
    schema: cartItemSchema,
  })
  @ApiConflictResponse({
    description: 'The cart item has been removed from the cart.',
  })
  @ApiNotFoundResponse({ description: 'The given cart item was not found.' })
  @ApiInternalServerErrorResponse({
    description: 'An error occurred while processing the request.',
  })
  async decrease(@Param('id') id: number) {
    return await this.cartItemsService.decreaseQuantity(id);
  }

  @Delete(':id')
  @ApiNoContentResponse({
    description: 'The given cart item has been successfully deleted.',
    schema: cartItemSchema,
  })
  @ApiNotFoundResponse({ description: 'The given cart item was not found.' })
  @ApiInternalServerErrorResponse({
    description: 'An error occurred while processing the request.',
  })
  async delete(@Param('id') id: number) {
    return await this.cartItemsService.delete(id);
  }
}
