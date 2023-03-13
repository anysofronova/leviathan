import { Category } from '@prisma/client';
import { TGoodFilters } from '../types';
import { ApiProperty } from '@nestjs/swagger';

export class GoodsFiltersSchema implements TGoodFilters {
  @ApiProperty({ type: String, isArray: true })
  readonly categories: Category[];
  @ApiProperty({ type: String, isArray: true })
  readonly relevance: string[];
}
