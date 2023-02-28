import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Category } from '.prisma/client';

export class CreateGoodDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  productImage: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  additionalImages: string[];

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  category: Category;

  @ApiProperty()
  @IsNotEmpty()
  price: string;

  @ApiProperty()
  @IsString()
  description?: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  sizes: string[];

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  colors: string[];

  @ApiProperty()
  @IsString()
  details?: string;

  @ApiProperty()
  @IsString()
  care?: string;

  @ApiProperty()
  @IsNumber()
  designerId: number;
}
