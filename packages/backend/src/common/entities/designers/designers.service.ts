import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateDesignerDto } from './dto/create-designer.dto';
import { PrismaService } from '../../../providers/prisma/prisma.service';
import { Designer, Prisma } from '@prisma/client';

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

  findOne(id: number): Promise<Designer> {
    return this.prisma.designer.findUnique({
      where: { id },
    });
  }

  update(id: number, dto: Prisma.DesignerUpdateInput): Promise<Designer> {
    return this.prisma.designer.update({ where: { id }, data: { ...dto } });
  }

  remove(id: number): Promise<Designer> {
    return this.prisma.designer.delete({ where: { id } });
  }
}
