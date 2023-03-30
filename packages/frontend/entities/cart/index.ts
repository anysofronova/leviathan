import { create } from 'zustand'

import { CartGood } from '#/shared/types'

interface ICartStore {
  cartGoods: CartGood[]
  addCartGoods: (good: CartGood) => void
  removeCartGoods: (id: number) => void
}

export const useCart = create<ICartStore>((set, get) => ({
  cartGoods: [],
  addCartGoods: (good: CartGood) => {
    set({ cartGoods: [...get().cartGoods, good] })
  },
  removeCartGoods: (id: number) => {
    set({ cartGoods: get().cartGoods.filter(el => el.id !== id) })
  }
}))
