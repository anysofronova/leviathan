import { Good } from '#/shared/types'

import { instance } from '../http'

const getGoods = async (queries?: Array<Record<string, string>>): Promise<Good[]> => {
  const params = queries?.map(keyValuePair => new URLSearchParams(keyValuePair)).join('&')
  const response = await instance.get(`/goods?${params ? params : ''}`)
  return response.data
}

const getOneGood = async (id: string): Promise<Good> => {
  const response = await instance.get(`/goods/${id}`)
  return response.data
}

export const goodsService = {
  getGoods,
  getOneGood
}
