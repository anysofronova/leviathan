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
  price: number;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  size: string;
  @ApiProperty()
  @IsNotEmpty()
  ownerId: number;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  colors: string;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  details: string;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  care: string;
}
