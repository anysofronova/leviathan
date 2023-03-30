import { Category } from '@prisma/client';

export type GoodFilters = Partial<{
  category: keyof typeof Category;
  sort: 'trending-desc' | 'latest-desc' | 'price-asc' | 'price-desc';
  designer: string;
}>;

export type TGoodFilters = {
  readonly categories: Category[];
  readonly relevance: string[];
};
