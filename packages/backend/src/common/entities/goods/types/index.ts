import { Category } from '@prisma/client';

export type GoodFilters = Partial<{
  category: keyof typeof Category;
  sort: 'price-asc' | 'price-desc' | 'trending' | 'latest' | 'relevance';
}>;
