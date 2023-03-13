import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { CreateDesignerDto } from './dto/create-designer.dto';
import { Designer, Prisma } from '@prisma/client';
import { DesignerError } from './enum';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class DesignersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateDesignerDto): Promise<Designer> {
    return this.prisma.designer.create({ data: { ...dto } }).catch(error => {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials taken');
        }
      }
      throw error;
    });
  }

  findAll(): Promise<Designer[]> {
    return this.prisma.designer.findMany();
  }

  async findOne(id: number): Promise<Designer> {
    const designer = await this.prisma.designer.findUnique({
      where: { id },
    });
    if (!designer) {
      throw new HttpException(DesignerError.NOT_FOUND, HttpStatus.NOT_FOUND);
    }
    return designer;
  }

  async update(id: number, dto: Prisma.DesignerUpdateInput): Promise<Designer> {
    const designer = await this.prisma.designer.update({
      where: { id },
      data: { ...dto },
    });
    if (!designer) {
      throw new HttpException(DesignerError.NOT_FOUND, HttpStatus.NOT_FOUND);
    }
    return designer;
  }

  async remove(id: number): Promise<Designer> {
    const designer = await this.prisma.designer.delete({ where: { id } });
    if (!designer) {
      throw new HttpException(DesignerError.NOT_FOUND, HttpStatus.NOT_FOUND);
    }
    return designer;
  }
}
