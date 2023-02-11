import { JwtService } from '@nestjs/jwt';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import * as env from 'env-var';
import * as argon from 'argon2';

import { TPayload, TToken } from './types';
import { SignUpDto, SignInDto } from './dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  signUpLocal = async ({
    password,
    email,
    firstName,
    lastName,
  }: SignUpDto): Promise<TToken> => {
    const hash = await argon.hash(password);
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (user)
      throw new HttpException(
        'Account with this email already exists',
        HttpStatus.CONFLICT,
      );
    const newUser = await this.prisma.user.create({
      data: {
        email,
        password,
        firstName,
        lastName,
        accessToken: hash,
      },
    });

    const tokens = await this.getTokens(newUser.id, newUser.email);
    await this.updateRtHash(newUser.id, tokens.refresh_token);

    return tokens;
  };

  signInLocal = async ({ password, email }: SignInDto): Promise<TToken> => {
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

    return tokens;
  };

  async logout(userId: number): Promise<boolean> {
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

    return true;
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
        expiresIn: '15m',
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: env.get('RT_SECRET').asString(),
        expiresIn: '3d',
      }),
    ]);
    return {
      access_token,
      refresh_token,
    };
  };
}
