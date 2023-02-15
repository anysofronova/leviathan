import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { TUserResponse } from './types';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  getAll() {
    return this.prisma.user.findMany();
  }

  async getOne(id: number): Promise<TUserResponse> {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    return {
      ...user,
      fullName: `${user.firstName} ${user.lastName}`,
    };
  }
}
