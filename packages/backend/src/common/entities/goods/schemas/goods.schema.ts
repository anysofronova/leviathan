import { ApiProperty } from '@nestjs/swagger';
import { Category, Good, GoodStatus, Size } from '@prisma/client';

export class GoodsSchema implements Good {
  @ApiProperty({ type: String, isArray: true })
  additionalImages: string[];
  @ApiProperty({ type: String, nullable: true })
  care: string | null;
  @ApiProperty({ type: String })
  category: Category;
  @ApiProperty({ type: String })
  status: GoodStatus;
  @ApiProperty({ type: String, isArray: true })
  colors: string[];
  @ApiProperty({ type: Date })
  createdAt: Date;
  @ApiProperty({ type: String, nullable: true })
  description: string | null;
  @ApiProperty({ type: Number })
  designerId: number;
  @ApiProperty({ type: String, nullable: true })
  details: string | null;
  @ApiProperty({ type: Number })
  id: number;
  @ApiProperty({ type: String })
  name: string;
  @ApiProperty({ type: String })
  price: string;
  @ApiProperty({ type: String })
  productImage: string;
  @ApiProperty({ type: Number })
  rating: number;
  @ApiProperty({ type: Number })
  salePercent: number;
  @ApiProperty({ type: String, isArray: true })
  sizes: Size[];

  @ApiProperty({ type: Number })
  relatedGoodsId: number;

  @ApiProperty({ type: Date })
  updatedAt: Date;
}
