import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class GoodsService {
  constructor(private readonly prisma: PrismaService) {}

  async searchGoods(
    category: string,
    designer: string,
    sort: string,
  ): Promise<Prisma.GoodWhereInput[]> {
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
