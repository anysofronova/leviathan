import { JwtService } from '@nestjs/jwt';
import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import * as env from 'env-var';
import * as argon from 'argon2';

import { SignUpDto, SignInDto } from './dto';
import { TPayload, TToken, TResponse } from './types';
import { PrismaService } from '../prisma/prisma.service';
import { UsersService } from '../users/users.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  signUpLocal = async (dto: SignUpDto): Promise<void> => {
    const hash = await this.hashData(dto.password);
    const user = await this.usersService.findByEmail(dto.email);
    if (user)
      throw new HttpException(
        'Account with this email already exists',
        HttpStatus.CONFLICT,
      );
    const newUser = await this.prisma.user
      .create({
        data: {
          ...dto,
          password: hash,
        },
      })
      .catch((error) => {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          if (error.code === 'P2002') {
            throw new ForbiddenException('Credentials taken');
          }
        }
        throw error;
      });

    const tokens = await this.getTokens(newUser.id, newUser.email);
    await this.updateRefreshToken(newUser.id, tokens.refresh_token);
  };

  signInLocal = async ({ password, email }: SignInDto): Promise<TResponse> => {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    const passwordMatches = await argon.verify(user.accessToken, password);
    if (!passwordMatches)
      throw new HttpException(
        'Incorrect Password',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );

    const tokens = await this.getTokens(user.id, user.email);
    await this.updateRefreshToken(user.id, tokens.refresh_token);

    return {
      ...tokens,
      expiresIn: env.get('AT_EXPIRES_IN').asInt(),
      type: 'Bearer',
      user: {
        ...user,
        fullName: `${user.firstName} ${user.lastName}`,
      },
    };
  };

  async logout(userId: number): Promise<void> {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }

    await this.prisma.user.updateMany({
      where: {
        id: userId,
        refreshToken: {
          not: null,
        },
      },
      data: {
        refreshToken: null,
      },
    });
  }

  async refreshTokens(userId: number, refreshToken: string) {
    const user = await this.usersService.findById(userId);
    if (!user || !user.refreshToken) {
      throw new ForbiddenException('Access Denied');
    }
    const refreshTokenMatches = await argon.verify(
      user.refreshToken,
      refreshToken,
    );
    if (!refreshTokenMatches) {
      throw new ForbiddenException('Access Denied');
    }
    const tokens = await this.getTokens(user.id, user.email);
    await this.updateRefreshToken(user.id, tokens.refresh_token);
    return { tokens, id: user.id };
  }

  async hashData(data: string) {
    return argon.hash(data);
  }

  async updateRefreshToken(userId: number, refreshToken: string) {
    const hashedRefreshToken = await argon.hash(refreshToken);
    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        refreshToken: hashedRefreshToken,
      },
    });
  }

  getTokens = async (userId: number, email: string): Promise<TToken> => {
    const jwtPayload: TPayload = {
      sub: userId,
      email: email,
    };

    const [access_token, refresh_token] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: env.get('AT_SECRET').asString(),
        expiresIn: env.get('AT_EXPIRES_IN').asInt(),
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: env.get('RT_SECRET').asString(),
        expiresIn: env.get('RT_EXPIRES_IN').asInt(),
      }),
    ]);
    return {
      access_token,
      refresh_token,
    };
  };
}
