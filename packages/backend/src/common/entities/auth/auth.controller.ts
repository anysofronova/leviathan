import {
  Body,
  Controller,
  ForbiddenException,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RequestModel } from '../../../shared/types';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Public } from '../../decorators';
import { responseSchema, tokensSchema } from './schemas';
import { SignUpDto } from './dto/signUp.dto';
import { SignInDto } from './dto/signIn.dto';
import { TToken } from './types';
import { Response } from 'express';
import { LifetimeValues } from './enum';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private authService: AuthService) {}

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
  async signup(
    @Body()
    dto: SignUpDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const jwt = await this.authService.signUp(dto);
    response.cookie('jwt', jwt, {
      maxAge: LifetimeValues.COOKIE_MAX_AGE,
      httpOnly: true,
    });
    return { message: 'User created' };
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
  async signin(
    @Body()
    data: SignInDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const payload = await this.authService.signIn(data);
    const tokens = (({ type, user, ...rest }) => rest)(payload);
    response.cookie('jwt', tokens, {
      maxAge: LifetimeValues.COOKIE_MAX_AGE,
      httpOnly: true,
    });

    return payload;
  }

  @Post('logout')
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @ApiParam({ name: 'userId', type: 'number', description: 'Client userId' })
  @ApiOperation({
    summary: 'Logout User',
    description: 'Logout user using userId',
  })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success' })
  async logout(
    @Req()
    req: RequestModel,
  ) {
    await this.authService.logout(req.user['sub']);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @ApiParam({
    name: 'refreshToken',
    type: 'string',
    description: 'Client refresh token',
  })
  @ApiParam({ name: 'userId', type: 'number', description: 'Client userId' })
  @ApiOperation({
    summary: 'Refresh access Token',
    description: 'Refresh access token using userId and refresh token',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    schema: tokensSchema,
  })
  @Post('refresh')
  @ApiBody({
    schema: tokensSchema,
  })
  async refreshTokens(
    @Body() body,
    @Req() request: RequestModel,
    @Res({ passthrough: true }) response: Response,
  ): Promise<TToken> {
    const tokens = await this.authService.refreshTokens(
      body.userId,
      body.refreshToken,
    );
    if (!tokens.refresh_token) {
      throw new ForbiddenException('Cookie Denied');
    }
    if (!tokens) {
      throw new ForbiddenException('Jwt Denied');
    }
    response.cookie('jwt', tokens, {
      maxAge: LifetimeValues.COOKIE_MAX_AGE,
      httpOnly: true,
    });
    return tokens;
  }
}
