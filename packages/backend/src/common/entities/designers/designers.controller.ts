import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { DesignersService } from './designers.service';
import { CreateDesignerDto } from './dto/create-designer.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Designer } from '@prisma/client';
import { designerSchema, designersSchema } from './schemas';

@ApiTags('Designers')
@Controller('designers')
export class DesignersController {
  constructor(private readonly designersService: DesignersService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Create designer',
    description: 'Create one designer',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Success',
    schema: designerSchema,
  })
  create(@Body() dto: CreateDesignerDto): Promise<Designer> {
    return this.designersService.create(dto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Get all designers',
    description: 'Get all designers',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    schema: designersSchema,
  })
  findAll(): Promise<Designer[]> {
    return this.designersService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Get one designer',
    description: 'Get one designer',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    schema: designerSchema,
  })
  findOne(@Param('id') id: string): Promise<Designer> {
    return this.designersService.findOne(+id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Update a designer',
    description: 'Update a designer',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    schema: designerSchema,
  })
  update(
    @Param('id') id: string,
    @Body() dto: CreateDesignerDto,
  ): Promise<Designer> {
    return this.designersService.update(+id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Delete a designer',
    description: 'Delete a designer',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    schema: designerSchema,
  })
  remove(@Param('id') id: string): Promise<Designer> {
    return this.designersService.remove(+id);
  }
}
