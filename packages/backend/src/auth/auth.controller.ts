import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { AtGuard, RtGuard } from '../common/guards';
import { responseSchema, tokensSchema } from './schemas';
import { TToken, TResponse } from './types';
import { AuthService } from './auth.service';
import { SignInDto, SignUpDto } from './dto';
import { GetCurrentUser, GetCurrentUserId, Public } from '../common/decorators';

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
  @ApiResponse({ status: HttpStatus.OK, description: 'Success' })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Account with this email already exists',
  })
  @ApiBody({
    schema: { ...responseSchema },
  })
  signUpLocal(@Body() dto: SignUpDto): Promise<TResponse> {
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
  @ApiResponse({ status: HttpStatus.OK, description: 'Success' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'User not found' })
  @ApiResponse({
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    description: 'Incorrect Password',
  })
  @ApiBody({
    schema: { ...responseSchema },
  })
  signInLocal(@Body() dto: SignInDto): Promise<TResponse> {
    return this.authService.signInLocal(dto);
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
  logout(@GetCurrentUserId() userId: number): Promise<void> {
    return this.authService.logout(userId);
  }

  @Public()
  @UseGuards(RtGuard)
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
  @ApiResponse({ status: HttpStatus.OK, description: 'Success' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'User not found' })
  @ApiResponse({
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    description: 'Incorrect Password',
  })
  @ApiBody({
    schema: { ...tokensSchema },
  })
  refreshTokens(
    @GetCurrentUserId() userId: number,
    @GetCurrentUser('refreshToken') refreshToken: string,
  ): Promise<TToken> {
    return this.authService.refreshTokens(userId, refreshToken);
  }
}
