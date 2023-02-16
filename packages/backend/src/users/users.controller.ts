import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  UseGuards,
} from '@nestjs/common';

import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { TUserResponse } from './types';
import { UsersService } from './users.service';
import { usersSchema, userSchema } from './schemas';
import { AccessTokenGuard, RefreshTokenGuard } from '../common/guards';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get()
  @UseGuards(AccessTokenGuard)
  @UseGuards(RefreshTokenGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Get all users',
    description: 'Get all users',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    schema: usersSchema,
  })
  findAll() {
    return this.usersService.getAll();
  }

  @Get(':id')
  @UseGuards(AccessTokenGuard)
  @UseGuards(RefreshTokenGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Get one user',
    description: 'Get one user by ID',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    schema: userSchema,
  })
  findOne(@Param('id') id: string): Promise<TUserResponse> {
    return this.usersService.getOne(+id);
  }
}
