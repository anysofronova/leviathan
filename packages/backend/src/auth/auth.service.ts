import {
  BadRequestException,
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import * as argon from 'argon2';
import * as env from 'env-var';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { UserError } from './enum';
import { SignUpDto } from './dto/signUp.dto';
import { SignInPayload, SignUpPayload, TPayload, TToken } from './types';
import { SignInDto } from './dto/signIn.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly prismaService: PrismaService,
  ) {}

  async signUp(dto: SignUpDto): Promise<SignUpPayload> {
    const userExists = await this.usersService.findByEmail(dto.email);
    if (userExists) {
      throw new BadRequestException(UserError.ALREADY_REGISTERED);
    }

    const newUser = await this.usersService.create(dto);

    const tokens = await this.getTokens(newUser.id, newUser.email);
    await this.updateRefreshToken(newUser.id, tokens.refresh_token);
    return { ...tokens, id: newUser.id };
  }

  async signIn(data: SignInDto): Promise<SignInPayload> {
    const user = await this.usersService.findByEmail(data.email);

    if (!user) {
      throw new HttpException(UserError.NOT_FOUND, HttpStatus.NOT_FOUND);
    }
    const passwordMatches = await argon.verify(user.password, data.password);

    if (!passwordMatches) {
      throw new HttpException(
        UserError.WRONG_PASSWORD,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    const tokens = await this.getTokens(user.id, user.email);
    await this.updateRefreshToken(user.id, tokens.refresh_token);

    return {
      ...tokens,
      expiresIn: env.get('JWT_EXPIRES_IN').asInt(),
      type: 'Bearer',
      user: {
        ...user,
        fullName: `${user.firstName} ${user.lastName}`,
      },
    };
  }

  async logout(userId: number) {
    return this.prismaService.user.update({
      where: {
        id: userId,
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
  async updateRefreshToken(userId: number, refreshToken: string) {
    const hashedRefreshToken = await argon.hash(refreshToken);
    await this.prismaService.user.update({
      where: {
        id: userId,
      },
      data: {
        refreshToken: hashedRefreshToken,
      },
    });
  }

  async verifyUser(authToken) {
    return await this.jwtService.verifyAsync(authToken, {
      secret: env.get('JWT_ACCESS_SECRET').asString(),
    });
  }

  getTokens = async (userId: number, email: string): Promise<TToken> => {
    const jwtPayload: TPayload = {
      sub: userId,
      email: email,
    };

    const [access_token, refresh_token] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: env.get('JWT_ACCESS_SECRET').asString(),
        expiresIn: env.get('JWT_EXPIRES_IN').asInt(),
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: env.get('JWT_REFRESH_SECRET').asString(),
        expiresIn: env.get('JWT_REFRESH_EXPIRES_IN').asInt(),
      }),
    ]);
    return {
      access_token,
      refresh_token,
    };
  };
}
