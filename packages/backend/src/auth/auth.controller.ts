import {
  Body,
  Controller,
  ForbiddenException,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Response } from 'express';
import { AccessTokenGuard, RefreshTokenGuard } from '../common/guards';
import { responseSchema, tokensSchema } from './schemas';
import { TResponse } from './types';
import { AuthService } from './auth.service';
import { SignInDto, SignUpDto } from './dto';
import { GetCurrentUserId, Public } from '../common/decorators';
import { RequestModel } from './types/request.type';

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Public()
  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  @ApiParam({
    name: 'password',
    type: 'string',
    description: 'Client password',
  })
  @ApiParam({ name: 'email', type: 'string', description: 'Client e-mail' })
  @ApiParam({
    name: 'lastName',
    type: 'string',
    description: 'Client lastname',
  })
  @ApiParam({
    name: 'firstName',
    type: 'string',
    description: 'Client firstname',
  })
  @ApiOperation({
    summary: 'Register user',
    description: 'Register user using firstname, lastname, email and password',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    schema: responseSchema,
  })
  signUpLocal(@Body() dto: SignUpDto): Promise<void> {
    return this.authService.signUpLocal(dto);
  }

  @Public()
  @ApiBearerAuth()
  @Post('signin')
  @HttpCode(HttpStatus.OK)
  @ApiParam({
    name: 'password',
    type: 'string',
    description: 'Client password',
  })
  @ApiParam({ name: 'email', type: 'string', description: 'Client e-mail' })
  @ApiOperation({
    summary: 'Login User',
    description: 'Login user using email and password',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    schema: responseSchema,
  })
  signInLocal(@Body() dto: SignInDto): Promise<TResponse> {
    return this.authService.signInLocal(dto);
  }

  @Post('logout')
  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard)
  @UseGuards(RefreshTokenGuard)
  @HttpCode(HttpStatus.OK)
  @ApiParam({ name: 'userId', type: 'number', description: 'Client userId' })
  @ApiOperation({
    summary: 'Logout User',
    description: 'Logout user using userId',
  })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success' })
  logout(@GetCurrentUserId() userId: number): Promise<void> {
    return this.authService.logout(userId);
  }

  @Public()
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @ApiParam({
    name: 'refreshToken',
    type: 'string',
    description: 'Client refresh token',
  })
  @ApiParam({ name: 'userId', type: 'number', description: 'Client userId' })
  @ApiOperation({
    summary: 'Refresh Access Token with refresh token',
    description: 'Refresh token using userId and refresh token',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    schema: tokensSchema,
  })
  async refreshTokens(
    @Req() request: RequestModel,
    @Res({ passthrough: true }) response: Response,
  ) {
    if (!request.cookies.jwt) {
      throw new ForbiddenException('Cookie Denied');
    }
    const jwt = await this.authService.refreshTokens(
      request.cookies.jwt.id,
      request.cookies.jwt.tokens.refreshToken,
    );
    if (!jwt) {
      throw new ForbiddenException('Jwt Denied');
    }
    response.cookie('jwt', jwt, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    return jwt.tokens.access_token;
  }
}
