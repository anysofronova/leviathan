import { Injectable, UseFilters } from '@nestjs/common';
import { Good } from '.prisma/client';
import { CreateGoodDto } from './dto/create-good.dto';
import { PrismaService } from 'nestjs-prisma';
import { PrismaClientExceptionFilter } from '../prisma/prisma-client-exception.filter';

@Injectable()
@UseFilters(PrismaClientExceptionFilter)
export class GoodsService {
  constructor(private readonly prisma: PrismaService) {}

  async getAll(): Promise<Good[]> {
    return this.prisma.good.findMany();
  }

  async createGood(dto: CreateGoodDto): Promise<Good> {
    return this.prisma.good.create({ data: { ...dto } });
  }

  async findGoodsByName(name: string): Promise<Good[]> {
    return this.prisma.good.findMany({
      where: {
        name: {
          contains: name,
        },
      },
    });
  }

  async getGoods(search?: string): Promise<Good[]> {
    if (search) {
      return this.findGoodsByName(search);
    }
    return this.prisma.good.findMany();
  }
}
