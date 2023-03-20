import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { CartItem, Status } from '@prisma/client';

export class CreateOrderDto {
  @IsNumber()
  @ApiProperty({ type: 'number', description: 'User ID' })
  userId: number;

  @IsString()
  @ApiProperty({ type: 'string', description: 'Address' })
  address: string;

  @IsString()
  @ApiProperty({ type: 'string', description: 'Price' })
  price: string;

  @IsEnum(Status)
  @IsOptional()
  @ApiProperty({
    type: 'string',
    description: 'Status (default: PROCESSING)',
    enum: Status,
    default: Status.PROCESSING,
  })
  status?: Status = Status.PROCESSING;

  @ApiProperty({ type: 'array', description: 'Cart Items' })
  @IsArray()
  cartItems: CartItem[];
}
