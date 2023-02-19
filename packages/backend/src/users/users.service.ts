import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SignUpDto } from '../auth/dto/signUp.dto';
import { Prisma, User } from '@prisma/client';
import { TUserResponse } from './types';
import * as argon from 'argon2';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  getAll() {
    return this.prisma.user.findMany();
  }

  async findById(id: number): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async hashData(data: string) {
    return argon.hash(data);
  }

  async create(dto: SignUpDto): Promise<User> {
    const hash = await this.hashData(dto.password);
    return await this.prisma.user
      .create({
        data: {
          ...dto,
          password: hash,
        },
      })
      .catch(error => {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          if (error.code === 'P2002') {
            throw new ForbiddenException('Credentials taken');
          }
        }
        throw error;
      });
  }

  async getMe(id: number): Promise<TUserResponse> {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    const me = (({ accessToken, password, refreshToken, ...rest }) => rest)(
      user,
    );
    return {
      ...me,
      fullName: `${user.firstName} ${user.lastName}`,
    };
  }
}
