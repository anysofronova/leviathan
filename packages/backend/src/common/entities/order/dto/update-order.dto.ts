import { IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Status } from '@prisma/client';

export class UpdateOrderDto {
  @IsOptional()
  @IsNumber()
  @ApiProperty({ type: 'number', description: 'User ID' })
  userId?: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty({ type: 'number', description: 'Good ID' })
  goodId?: number;

  @IsOptional()
  @IsString()
  @ApiProperty({ type: 'string', description: 'Address' })
  address?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ type: 'string', description: 'Price' })
  price?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    type: 'string',
    description: 'Status',
    enum: Status,
  })
  status?: Status;
}
