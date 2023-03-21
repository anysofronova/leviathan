import { Good } from '#/shared/types'

import { instance } from '../http'

const getProducts = async (): Promise<Good[]> => {
  const response = await instance.get('/goods/list')
  return response.data
}

export const productsService = {
  getProducts
}
