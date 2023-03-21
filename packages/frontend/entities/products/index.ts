import { create } from 'zustand'

import { productsService } from '#/shared/api/services'
import { Good } from '#/shared/types'
import { withLoading } from '#/shared/utils'

interface IGoodsStore {
  goods: Good[]
  loading: boolean
  getGoods: () => Promise<void>
  getOneGood: (id: string) => Promise<void>
}

export const useProducts = create<IGoodsStore>(set => ({
  goods: [],
  loading: false,
  getGoods: withLoading(async () => {
    const goods = await productsService.getGoods()
    set({ goods })
  }, set),
  getOneGood: withLoading(async (id: string) => {
    await productsService.getOneGood(id)
  }, set)
}))
