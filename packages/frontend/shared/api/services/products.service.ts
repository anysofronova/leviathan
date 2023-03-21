import { Good } from '#/shared/types'

import { instance } from '../http'

const getGoods = async (): Promise<Good[]> => {
  const response = await instance.get('/goods/list')
  return response.data
}

const getOneGood = async (id: string): Promise<Good> => {
  const response = await instance.get(`/goods/${id}`)
  return response.data
}

export const productsService = {
  getGoods,
  getOneGood
}
