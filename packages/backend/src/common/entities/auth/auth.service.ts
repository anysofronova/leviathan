import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import * as argon from 'argon2';
import * as env from 'env-var';
import { UsersService } from 'src/common/entities/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UserError } from './enum';
import { SignUpDto } from './dto/signUp.dto';
import { SignInPayload, SingUpPayload, TPayload, TToken } from './types';
import { SignInDto } from './dto/signIn.dto';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly prismaService: PrismaService,
  ) {}

  async signUp(dto: SignUpDto): Promise<SingUpPayload> {
    const userExists = await this.usersService.findByEmail(dto.email);
    if (userExists) {
      throw new BadRequestException(UserError.ALREADY_REGISTERED);
    }

    const newUser = await this.usersService.create(dto);

    const tokens = await this.getTokens(newUser.id, newUser.email);
    await this.updateTokens(newUser.id, [
      tokens.access_token,
      tokens.refresh_token,
    ]);

    await this.updateRefreshToken(newUser.id, tokens.refresh_token);
    return { tokens, id: newUser.id };
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
    await this.updateTokens(user.id, [
      tokens.access_token,
      tokens.refresh_token,
    ]);

    const sensitiveUser = (({ password, accessToken, refreshToken, ...rest }) =>
      rest)(user);

    return {
      ...tokens,
      expiresIn: env.get('JWT_EXPIRES_IN').asInt(),
      type: 'Bearer',
      user: {
        ...sensitiveUser,
        fullName: `${sensitiveUser.firstName} ${sensitiveUser.lastName}`,
      },
    };
  }

  async logout(userId: number): Promise<boolean> {
    await this.prismaService.user.updateMany({
      where: {
        id: userId,
        accessToken: {
          not: null,
        },
        refreshToken: {
          not: null,
        },
      },
      data: {
        accessToken: null,
        refreshToken: null,
      },
    });

    return true;
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

  async refreshTokens(userId: number, refreshToken: string): Promise<TToken> {
    try {
      const user = await this.usersService.findById(userId);

      if (!user?.refreshToken) {
        throw new UnauthorizedException('User not authenticated');
      }

      const isRefreshTokenValid = await argon.verify(
        user.refreshToken,
        refreshToken,
      );

      if (!isRefreshTokenValid) {
        throw new UnauthorizedException('Invalid refresh token');
      }

      const { id, email } = user;
      const { access_token, refresh_token } = await this.getTokens(id, email);

      await this.updateTokens(id, [access_token, refresh_token]);

      return { access_token, refresh_token };
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new InternalServerErrorException('Database error occurred');
      }
      throw error;
    }
  }

  async updateTokens(userId: number, tokens: string[]) {
    const [accessToken, refreshToken] = tokens;
    const hashedAccessToken = await argon.hash(accessToken);
    const hashedRefreshToken = await argon.hash(refreshToken);
    await this.prismaService.user.updateMany({
      where: {
        id: userId,
      },
      data: {
        accessToken: hashedAccessToken,
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
