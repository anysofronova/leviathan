import { Controller, Get, Query } from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { GoodsService } from './goods.service';
import { Prisma } from '@prisma/client';

@ApiTags('Goods')
@Controller('goods')
export class GoodsController {
  constructor(private readonly goodsService: GoodsService) {}

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
  @Get('search')
  async searchGoods(
    @Query('category') category?: string,
    @Query('designer') designer?: string,
    @Query('sort') sort?: string,
  ): Promise<Prisma.GoodWhereInput[]> {
    return await this.goodsService.searchGoods(category, designer, sort);
  }
}
