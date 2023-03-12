import { Category } from '@prisma/client';

export type GoodFilters = {
  category: keyof Category | 'Popular' | 'New Arrivals';
  designedId: number;
  sort: 'price-asc' | 'price-desc' | 'trending' | 'latest' | 'relevance';
};
