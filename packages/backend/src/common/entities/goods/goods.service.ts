import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../../providers/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { Good } from '.prisma/client';

@Injectable()
export class GoodsService {
  constructor(private readonly prisma: PrismaService) {}

  async getAll(): Promise<Good[]> {
    return this.prisma.good.findMany();
  }

  async createGood(dto: any): Promise<Good> {
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
    category: string,
    designer: string,
    sort: string,
  ): Promise<Good[]> {
    const query = {
      ...(category
        ? {
            category: {
              startsWith:
                category === 'new_arrivals' ? 'New Arrivals' : 'Featured',
            },
          }
        : {}),
      ...(designer ? { designer } : {}),
    } as Prisma.GoodWhereInput;

    const orderBy =
      sort &&
      ({
        trending: { sold: 'desc' },
        latest_arrivals: { createdAt: 'desc' },
        price_low_to_high: { price: 'asc' },
        price_high_to_low: { price: 'desc' },
      }[sort] as Prisma.Enumerable<Prisma.GoodOrderByWithRelationInput>);

    return this.prisma.good.findMany({
      where: query,
      orderBy,
    });
  }
}
