import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { GoodsService } from './goods.service';
import { Good } from '.prisma/client';
import { Public } from '../../decorators';
import { CreateGoodDto } from './dto/create-good.dto';

@ApiTags('Goods')
@Controller('goods')
export class GoodsController {
  constructor(private readonly goodsService: GoodsService) {}

  @Public()
  @Get('all')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Get all goods',
    description: 'Get all goods',
  })
  async getAll(): Promise<Good[]> {
    return await this.goodsService.getAll();
  }

  @Public()
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Create good',
    description: 'Create one good',
  })
  async createGood(@Body() dto: CreateGoodDto): Promise<Good> {
    return await this.goodsService.createGood(dto);
  }

  @ApiQuery({
    name: 'category',
    description: 'Filter goods by category: "New Arrivals" or "Featured"',
    required: false,
  })
  @ApiQuery({
    name: 'designer',
    description: 'Filter goods by designer name (comma-separated list)',
    required: false,
  })
  @ApiQuery({
    name: 'sort',
    description:
      'Sort goods by "Trending", "Latest arrivals", "Price: Low to high", or "Price: High to low"',
    required: false,
  })
  @Get('all')
  @HttpCode(HttpStatus.OK)
  @HttpCode(HttpStatus.OK)
  async searchGoods(
    @Query('sort') sortBy: string,
    @Query('filter') filterBy: string,
    @Query('designer') designerId: number,
  ): Promise<Good[]> {
    return await this.goodsService.searchGoods(sortBy, filterBy, designerId);
  }
}
