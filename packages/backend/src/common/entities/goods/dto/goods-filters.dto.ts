import { ApiPropertyOptional } from '@nestjs/swagger';
import { Category } from '@prisma/client';

export class GoodsFiltersDto {
  @ApiPropertyOptional({ enum: Category })
  category: keyof typeof Category;
  @ApiPropertyOptional({
    enum: ['price-asc', 'price-desc', 'trending', 'latest', 'relevance'],
  })
  sort: 'price-asc' | 'price-desc' | 'trending' | 'latest' | 'relevance';
}

export class GoodsSchemaFilters {
  @ApiPropertyOptional()
  filters: GoodsFiltersDto;
}
