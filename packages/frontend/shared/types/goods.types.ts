type Category = 'MEN' | 'WOMEN' | 'KIDS' | 'ACCESSORIES' | 'POPULAR' | 'NEW_ARRIVALS'

export type Good = {
  id: number
  createdAt: Date
  productImage: string
  additionalImages: string[]
  price: string
  name: string
  description: string | null
  details: string | null
  care: string | null
  colors: string[]
  sizes: string[]
  updatedAt: Date
  salePercent: number
  rating: number
  designerId: number
  category: Category
}

export interface CartGood {
  id: number
  productImage: string
  price: string
  name: string
  color: string
  size: string
}
