import { Category } from '@prisma/client';

export type GoodFilters = Partial<{
  category: keyof typeof Category;
  sort: 'trending-desc' | 'latest-desc' | 'price-asc' | 'price-desc';
}>;

export type TGoodFilters = {
  readonly categories: Category[];
  readonly relevance: string[];
};
