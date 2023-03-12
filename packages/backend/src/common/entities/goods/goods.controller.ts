import {
  Body,
  Controller,
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
import { GoodFilters } from './types';
import { GoodsSchemaFilters } from './dto/goods-filters.dto';
import { GoodsSchema } from './schemas/goods.schema';

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

  @Post('list')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Get goods list with search and filters',
    description: 'Get goods list with search and filters',
  })
  @ApiQuery({ name: 'search', required: false })
  @ApiBody({ type: GoodsSchemaFilters, required: false })
  @ApiOkResponse({
    type: GoodsSchema,
    isArray: true,
  })
  async searchGoods(
    @Query('search') search?: string,
    @Body() filters?: GoodFilters,
  ): Promise<Good[]> {
    return await this.goodsService.getGoods(search, filters);
  }
}
