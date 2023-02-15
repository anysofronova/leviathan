import { JwtService } from '@nestjs/jwt';
import {
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
import { Prisma } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  signUpLocal = async (dto: SignUpDto): Promise<TResponse> => {
    const hash = await argon.hash(dto.password);
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    if (user)
      throw new HttpException(
        'Account with this email already exists',
        HttpStatus.CONFLICT,
      );
    const newUser = await this.prisma.user.create({
      data: {
        ...dto,
        accessToken: hash,
      },
    });
    const tokens = await this.getTokens(newUser.id, newUser.email);
    await this.updateRtHash(newUser.id, tokens.refresh_token);
    return {
      ...tokens,
      expiresIn: env.get('AT_EXPIRES_IN').asInt(),
      type: 'Bearer',
      user: {
        ...newUser,
        fullName: `${newUser.firstName} ${newUser.lastName}`,
      },
    };
  };

  buildUser(newUser: Prisma.UserSelect) {
    return {
      ...newUser,
      fullName: `${newUser.firstName} ${newUser.lastName}`,
    };
  }

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
    await this.updateRtHash(user.id, tokens.refresh_token);

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

    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        accessToken: null,
        refreshToken: null,
      },
    });
  }

  async refreshTokens(userId: number, rt: string): Promise<TToken> {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user || !user.refreshToken)
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    const rtMatches = await argon.verify(user.refreshToken, rt);
    if (!rtMatches)
      throw new HttpException(
        'Incorrect Password',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );

    const tokens = await this.getTokens(user.id, user.email);
    await this.updateRtHash(user.id, tokens.refresh_token);

    return tokens;
  }

  async updateRtHash(userId: number, rt: string): Promise<void> {
    const hash = await argon.hash(rt);
    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        refreshToken: hash,
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
