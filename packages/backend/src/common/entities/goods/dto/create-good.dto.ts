import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayNotEmpty,
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Category, Size } from '@prisma/client';

export class CreateGoodDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  productImage: string;

  @ApiProperty()
  @IsArray()
  @ArrayNotEmpty()
  additionalImages: string[];

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(Category)
  category: Category;

  @ApiProperty()
  @IsNotEmpty()
  price: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  description: string;

  @ApiProperty()
  @IsArray()
  @ArrayNotEmpty()
  sizes: Size[];

  @ApiProperty()
  @IsArray()
  @ArrayNotEmpty()
  colors: string[];

  @ApiProperty()
  @IsString()
  @IsOptional()
  details: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  care: string;

  @ApiProperty()
  @IsNumber()
  designerId: number;

  @ApiProperty()
  @IsOptional()
  relatedGoodsId?: number;
}
