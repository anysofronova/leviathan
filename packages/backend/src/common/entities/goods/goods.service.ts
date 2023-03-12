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
import { GoodFilters } from './types';

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
  async searchGoodsByName(search: string): Promise<Good[]> {
    return this.prisma.good.findMany({
      where: {
        name: {
          contains: search,
        },
      },
    });
  }

  checkFilters(filters: GoodFilters) {
    return (
      filters &&
      Object.values(filters).every(
        value => value !== null && value !== undefined && !!value,
      )
    );
  }

  async prepareFilters(filters: GoodFilters) {
    const isValidFilters = this.checkFilters(filters);
    const { category, sort } = filters;
    if (!isValidFilters) {
      throw new HttpException(
        'Invalid category value or sort value',
        HttpStatus.BAD_REQUEST,
      );
    }
    // TODO: fix category filter when category invalid
    const goods = this.prisma.good.findMany({
      where: {
        category: { equals: category },
      },
      orderBy: {
        price: sort === 'price-asc' ? 'asc' : 'desc',
        rating: sort === 'trending' ? 'desc' : undefined,
        createdAt: sort === 'latest' ? 'desc' : undefined,
      },
    });

    return goods;
  }

  async applyGoodFilters(
    search?: string,
    filters?: GoodFilters,
  ): Promise<Good[]> {
    if (search) {
      return this.searchGoodsByName(search);
    }
    return this.prepareFilters(filters);
  }

  async getGoods(search?: string, filters?: GoodFilters): Promise<Good[]> {
    return await this.applyGoodFilters(search, filters);
  }
}
