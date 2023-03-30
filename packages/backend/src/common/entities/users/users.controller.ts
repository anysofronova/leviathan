import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  UseGuards,
} from '@nestjs/common';

import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { userSchema, usersSchema } from './schemas';
import { TUserResponse } from './types';
import { Roles } from '../../decorators/roles.decorator';
import { Role } from '@prisma/client';
import { RolesGuard } from '../../guards/roles.guard';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get()
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
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
    return this.usersService.getMe(+id);
  }
}
