import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DesignersService } from './designers.service';
import { CreateDesignerDto } from './dto/create-designer.dto';

@Controller('designers')
export class DesignersController {
  constructor(private readonly designersService: DesignersService) {}

  @Post()
  create(@Body() dto: CreateDesignerDto) {
    return this.designersService.create(dto);
  }

  @Get()
  findAll() {
    return this.designersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.designersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: CreateDesignerDto) {
    return this.designersService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.designersService.remove(+id);
  }
}
