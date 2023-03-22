import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Category, Good, Size } from '@prisma/client';

export class UpdateGoodDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  productImage?: string;

  @ApiProperty()
  @IsArray()
  @IsOptional()
  additionalImages?: string[];

  @ApiProperty()
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty()
  @IsEnum(Category)
  @IsOptional()
  category?: Category;

  @ApiProperty()
  @IsOptional()
  price?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty()
  @IsArray()
  @IsOptional()
  sizes?: Size[];

  @ApiProperty()
  @IsArray()
  @IsOptional()
  colors?: string[];

  @ApiProperty()
  @IsString()
  @IsOptional()
  details?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  care?: string;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  designerId?: number;

  @ApiProperty()
  @IsArray()
  @IsOptional()
  relatedGoods: Good[];
}
