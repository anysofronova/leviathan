import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../../providers/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { Good } from '.prisma/client';
import { CreateGoodDto } from './dto/create-good.dto';

@Injectable()
export class GoodsService {
  constructor(private readonly prisma: PrismaService) {}

  async getAll(): Promise<Good[]> {
    return this.prisma.good.findMany();
  }

  async createGood(dto: CreateGoodDto): Promise<Good> {
    return this.prisma.good.create({ data: { ...dto } }).catch(error => {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials taken');
        }
      }
      throw error;
    });
  }

  async searchGoods(
    sortBy?: string,
    filterBy?: string,
    designerId?: number,
  ): Promise<Good[]> {
    return this.prisma.good.findMany({
      orderBy: this.getSortByClause(sortBy),
      where: this.getFilterByClause(filterBy, designerId),
    });
  }

  private getSortByClause(
    sortBy: string,
  ): Prisma.Enumerable<Prisma.GoodOrderByWithRelationInput> {
    switch (sortBy) {
      case 'price-asc':
        return { price: 'asc' };
      case 'price-desc':
        return { price: 'desc' };
      case 'trending':
        return { rating: 'desc' };
      case 'latest':
        return { createdAt: 'desc' };
      default:
        return {};
    }
  }

  private getFilterByClause(
    category: string,
    designer: number,
  ): Prisma.GoodWhereInput {
    const where: Prisma.GoodWhereInput = {};

    if (category) {
      switch (category) {
        case 'New Arrivals':
          where.createdAt = {
            gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
          };
          break;
        case 'Popular':
          where.rating = {
            gte: 4,
          };
          break;
        case 'Men':
          where.category = {
            equals: 'MEN',
          };
          break;
        case 'Women':
          where.category = {
            equals: 'WOMEN',
          };
          break;
        case 'Kids':
          where.category = {
            equals: 'KIDS',
          };
          break;
        case 'Accessories':
          where.category = {
            equals: 'ACCESSORIES',
          };
          break;
      }
    }

    if (designer) {
      where.designerId = {
        equals: designer,
      };

      return where;
    }
  }
}
