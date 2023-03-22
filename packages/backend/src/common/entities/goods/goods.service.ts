import {
  HttpException,
  HttpStatus,
  Injectable,
  UseFilters,
} from '@nestjs/common';
import { Good } from '.prisma/client';
import { CreateGoodDto } from './dto/create-good.dto';
import { PrismaService } from 'nestjs-prisma';
import { PrismaClientExceptionFilter } from '../prisma/prisma-client-exception.filter';
import { DesignersService } from '../designers/designers.service';
import { GoodError } from './enum';
import { Category, Prisma } from '@prisma/client';
import { GoodFilters, TGoodFilters } from './types';
import { UpdateGoodDto } from './dto/update-good.dto';

type OrderByCondition = {
  [key: string]: Prisma.SortOrder;
};

@Injectable()
@UseFilters(PrismaClientExceptionFilter)
export class GoodsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly designer: DesignersService,
  ) {}

  async createGood(dto: CreateGoodDto): Promise<Good> {
    const designer = await this.designer.findOne(dto.designerId);
    if (!designer) {
      throw new HttpException(GoodError.NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    return this.prisma.good.create({ data: { ...dto } });
  }

  async update(id: number, dto: UpdateGoodDto): Promise<Good> {
    const good = await this.prisma.good.update({
      where: { id },
      data: { ...dto },
    });
    if (!good) {
      throw new HttpException(GoodError.NOT_FOUND, HttpStatus.NOT_FOUND);
    }
    return good;
  }

  async searchGoodsByName(search: string): Promise<Good[]> {
    return this.prisma.good.findMany({
      where: {
        name: {
          contains: search,
        },
      },
    });
  }

  readonly sortOrderMap: Record<string, OrderByCondition> = {
    'price-asc': { price: 'asc' },
    'price-desc': { price: 'desc' },
    'trending-desc': { rating: 'desc' },
    'latest-desc': { createdAt: 'desc' },
  };
  async prepareFilters(
    category?: GoodFilters['category'],
    sort?: GoodFilters['sort'],
    designer?: GoodFilters['designer'],
  ) {
    const sortOrder = sort ? this.sortOrderMap[sort] : undefined;
    if (sort && !sortOrder) {
      throw new HttpException('Invalid sort value', HttpStatus.BAD_REQUEST);
    }

    if (category && !Object.values(Category).includes(category)) {
      throw new HttpException('Invalid category value', HttpStatus.BAD_REQUEST);
    }

    return this.prisma.good.findMany({
      where: {
        category: { equals: category },
        designer: { id: designer },
      },
      orderBy: sortOrder,
    });
  }

  async applyGoodFilters(
    search?: string,
    category?: GoodFilters['category'],
    sort?: GoodFilters['sort'],
    designer?: GoodFilters['designer'],
  ): Promise<Good[]> {
    if (search) {
      return this.searchGoodsByName(search);
    }
    return this.prepareFilters(category, sort, designer);
  }

  async getGoods(
    search?: string,
    category?: GoodFilters['category'],
    sort?: GoodFilters['sort'],
    designer?: GoodFilters['designer'],
  ): Promise<Good[]> {
    return await this.applyGoodFilters(search, category, sort, designer);
  }

  async getGoodById(id: number): Promise<Good> {
    const good = await this.prisma.good.findUnique({ where: { id } });
    if (!good) {
      throw new HttpException(GoodError.NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    return good;
  }

  async getGoodsFilters(): Promise<TGoodFilters> {
    const categories = Object.values(Category);
    const relevance = [
      'trending-desc',
      'latest-desc',
      'price-asc',
      'price-desc',
    ];

    return { categories, relevance };
  }

  async remove(id: number): Promise<Good> {
    const good = await this.prisma.good.delete({ where: { id } });
    if (!good) {
      throw new HttpException(GoodError.NOT_FOUND, HttpStatus.NOT_FOUND);
    }
    return good;
  }
}
