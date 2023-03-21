import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
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
import { Roles } from '../../decorators/roles.decorator';
import { Role } from '@prisma/client';
import { RolesGuard } from '../../guards/roles.guard';
import { UpdateGoodDto } from './dto/update-good.dto';

@ApiTags('Goods')
@Controller('goods')
export class GoodsController {
  constructor(private readonly goodsService: GoodsService) {}

  @Public()
  @Post()
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
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

  @Patch(':id')
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Update a good',
    description: 'Update a good',
  })
  @ApiOkResponse({
    type: GoodsFiltersSchema,
  })
  update(@Param('id') id: string, @Body() dto: UpdateGoodDto): Promise<Good> {
    return this.goodsService.update(+id, dto);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Get good by id',
    description: 'Get good by id',
  })
  @ApiOkResponse({
    type: GoodsSchema,
  })
  async getGoodById(@Param('id', ParseIntPipe) id: number): Promise<Good> {
    return await this.goodsService.getGoodById(id);
  }

  @Public()
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

  @Get()
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

  @Delete(':id')
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Delete a good',
    description: 'Delete a good',
  })
  @ApiOkResponse({
    type: GoodsSchema,
  })
  remove(@Param('id') id: string): Promise<Good> {
    return this.goodsService.remove(+id);
  }
}
