import { create } from 'zustand'

import { goodsService } from '#/shared/api/services'
import { createSelectorFunctions } from '#/shared/lib/selectors'
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

const defaultQueries = {
  sort: '',
  search: '',
  category: '',
  designer: ''
}

const updateQueries = (currentQueries: Record<string, string>, params: Record<string, string>) => {
  if (params.search) {
    return { ...defaultQueries, search: params.search }
  }
  return { ...currentQueries, ...params, search: '' }
}

export const useGoods = create<IGoodsStore>((set, get) => ({
  goods: [],
  good: null,
  loading: false,
  queries: defaultQueries,
  getQueryGoods: withLoading(async params => {
    const newQueries = updateQueries(get().queries, params)
    const goods = await goodsService.getGoods(createEntries(newQueries))

    set({ goods, queries: newQueries })
  }, set)
}))

export const goodsSelectors = createSelectorFunctions(useGoods)
