import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { GoodsService } from './goods.service';
import { Good } from '.prisma/client';
import { Public } from '../../decorators';
import { CreateGoodDto } from './dto/create-good.dto';
import { GoodsSchema } from './schemas/goods.schema';
import { GoodFilters, TGoodFilters } from './types';
import { GoodsFiltersSchema } from './schemas/goods-filters.schema';

@ApiTags('Goods')
@Controller('goods')
export class GoodsController {
  constructor(private readonly goodsService: GoodsService) {}

  @Public()
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Create good',
    description: 'Create one good',
  })
  @ApiBody({ type: GoodsSchema, required: true })
  @ApiCreatedResponse({
    type: GoodsSchema,
  })
  async createGood(@Body() dto: CreateGoodDto): Promise<Good> {
    return await this.goodsService.createGood(dto);
  }

  @Get('filters')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Get goods filters list',
    description: 'Get goods filters list',
  })
  @ApiOkResponse({
    type: GoodsFiltersSchema,
  })
  async getGoodsFilters(): Promise<TGoodFilters> {
    return await this.goodsService.getGoodsFilters();
  }

  @Get('list')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Get goods list with search and filters',
    description: 'Get goods list with search and filters',
  })
  @ApiQuery({ name: 'search', required: false })
  @ApiQuery({ name: 'category', required: false })
  @ApiQuery({ name: 'sort', required: false })
  @ApiOkResponse({
    type: GoodsSchema,
    isArray: true,
  })
  async getGoods(
    @Query('search') search?: string,
    @Query('category') category?: GoodFilters['category'],
    @Query('sort') sort?: GoodFilters['sort'],
  ): Promise<Good[]> {
    return await this.goodsService.getGoods(search, category, sort);
  }
}
