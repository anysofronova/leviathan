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

  async update(id: number, dto: Prisma.GoodUpdateInput): Promise<Good> {
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

  private readonly sortOrderMap: Record<string, OrderByCondition> = {
    'price-asc': { price: 'asc' },
    'price-desc': { price: 'desc' },
    'trending-desc': { rating: 'desc' },
    'latest-desc': { createdAt: 'desc' },
  };

  async prepareFilters(
    category?: GoodFilters['category'],
    sort?: GoodFilters['sort'],
  ) {
    const sortOrder = this.sortOrderMap[sort];

    return this.prisma.good.findMany({
      where: {
        category: { equals: category },
      },
      orderBy: sortOrder,
    });
  }

  async applyGoodFilters(
    search?: string,
    category?: GoodFilters['category'],
    sort?: GoodFilters['sort'],
  ): Promise<Good[]> {
    if (search) {
      return this.searchGoodsByName(search);
    }
    return this.prepareFilters(category, sort);
  }

  async getGoods(
    search?: string,
    category?: GoodFilters['category'],
    sort?: GoodFilters['sort'],
  ): Promise<Good[]> {
    return await this.applyGoodFilters(search, category, sort);
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
