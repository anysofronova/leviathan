import { Injectable, UseFilters } from '@nestjs/common';
import { Good } from '.prisma/client';
import { CreateGoodDto } from './dto/create-good.dto';
import { PrismaService } from 'nestjs-prisma';
import { PrismaClientExceptionFilter } from '../prisma/prisma-client-exception.filter';
import { GoodFilters } from './types';

@Injectable()
@UseFilters(PrismaClientExceptionFilter)
export class GoodsService {
  constructor(private readonly prisma: PrismaService) {}

  async createGood(dto: CreateGoodDto): Promise<Good> {
    return this.prisma.good.create({ data: { ...dto } });
  }

  async applyGoodFilters(
    search?: string,
    filters?: GoodFilters,
  ): Promise<Good[]> {
    if (search) {
      return this.prisma.good.findMany({
        where: {
          name: {
            contains: search,
          },
        },
      });
    }
    return this.prisma.good.findMany();
  }

  async getGoods(search?: string, filters?: GoodFilters): Promise<Good[]> {
    return this.applyGoodFilters(search, filters);
  }
}
