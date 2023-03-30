import { create } from 'zustand'

import { createSelectorFunctions } from '#/shared/lib/selectors'
import { CartGood } from '#/shared/types'

interface ICartStore {
  cartGoods: CartGood[]
  addCartGoods: (good: CartGood) => void
  removeCartGoods: (id: number) => void
}

export const useCart = create<ICartStore>(set => ({
  cartGoods: [],
  addCartGoods: (good: CartGood) => {
    set((state: ICartStore) => ({ cartGoods: [...state.cartGoods, good] }))
  },
  removeCartGoods: (id: number) => {
    set((state: ICartStore) => ({
      cartGoods: state.cartGoods.filter(el => el.id !== id)
    }))
  }
}))

export const cartSelectors = createSelectorFunctions(useCart)
