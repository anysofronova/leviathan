import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateGoodDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  productImage: string;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  additionalImages: string;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;
  @ApiProperty()
  @IsNotEmpty()
  price: string;
  @ApiProperty()
  @IsString()
  description?: string;
  @ApiProperty()
  @IsString()
  size?: string;
  @ApiProperty()
  @IsString()
  colors?: string;
  @ApiProperty()
  @IsString()
  details?: string;
  @ApiProperty()
  @IsString()
  care?: string;
}
