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
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { TToken } from './types';
import { RtGuard } from '../common/guards';
import { AuthService } from './auth.service';
import { SignInDto, SignUpDto } from './dto';
import { GetCurrentUser, GetCurrentUserId, Public } from '../common/decorators';

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  @ApiParam({ name: 'password', type: 'string' })
  @ApiParam({ name: 'email', type: 'string' })
  @ApiParam({ name: 'lastName', type: 'string' })
  @ApiParam({ name: 'firstName', type: 'string' })
  @ApiOperation({ summary: 'Register user' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success' })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Account with this email already exists',
  })
  signUpLocal(@Body() dto: SignUpDto): Promise<TToken> {
    return this.authService.signUpLocal(dto);
  }

  @Public()
  @ApiBearerAuth()
  @Post('signin')
  @HttpCode(HttpStatus.OK)
  @ApiParam({ name: 'password', type: 'string' })
  @ApiParam({ name: 'email', type: 'string' })
  @ApiOperation({ summary: 'Login User' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'User not found' })
  @ApiResponse({
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    description: 'Incorrect Password',
  })
  signInLocal(@Body() dto: SignInDto): Promise<TToken> {
    return this.authService.signInLocal(dto);
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  @ApiParam({ name: 'userId', type: 'number' })
  @ApiOperation({ summary: 'Logout User' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success' })
  logout(@GetCurrentUserId() userId: number): Promise<boolean> {
    return this.authService.logout(userId);
  }

  @Public()
  @UseGuards(RtGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @ApiParam({ name: 'refreshToken', type: 'string' })
  @ApiParam({ name: 'userId', type: 'number' })
  @ApiOperation({ summary: 'Refresh Access Token with refresh token' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'User not found' })
  @ApiResponse({
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    description: 'Incorrect Password',
  })
  refreshTokens(
    @GetCurrentUserId() userId: number,
    @GetCurrentUser('refreshToken') refreshToken: string,
  ): Promise<TToken> {
    return this.authService.refreshTokens(userId, refreshToken);
  }
}
