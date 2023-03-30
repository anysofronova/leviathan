import { create } from 'zustand'

import { productsService } from '#/shared/api/services'
import { Good } from '#/shared/types'
import { withLoading } from '#/shared/utils'
import { createEntries } from '#/shared/utils/urlEntries'

interface IGoodsStore {
  goods: Good[]
  good: Good | null
  loading: boolean
  queries: Record<string, string>
  getQueryGoods: (params: Record<string, string>) => Promise<void>
}

export const useGoods = create<IGoodsStore>((set, get) => ({
  goods: [],
  good: null,
  loading: false,
  queries: {
    sort: '',
    search: '',
    category: '',
    designer: ''
  },
  getQueryGoods: withLoading(async params => {
    let goods: Good[]
    if (params.search) {
      set({
        queries: {
          sort: '',
          search: params.search,
          category: '',
          designer: ''
        }
      })
      goods = await productsService.getGoods(createEntries(get().queries))
    } else {
      set({ queries: { ...get().queries, ...params, search: '' } })
      goods = await productsService.getGoods(createEntries(get().queries))
    }
    set({ goods })
  }, set)
}))
