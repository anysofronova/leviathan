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
import { GoodError } from './enum';

@Injectable()
@UseFilters(PrismaClientExceptionFilter)
export class GoodsService {
  constructor(private readonly prisma: PrismaService) {}

  async getAll(): Promise<Good[]> {
    return this.prisma.good.findMany();
  }

  async createGood(dto: CreateGoodDto): Promise<Good> {
    const designer = this.prisma.designer.findUnique({
      where: { id: dto.designerId },
    });
    if (!designer)
      throw new HttpException(GoodError.NOT_FOUND, HttpStatus.NOT_FOUND);
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
