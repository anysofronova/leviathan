import { IDesigner, IFilters } from '#/shared/types'

import { instance } from '../http'

const getFilters = async (): Promise<IFilters> => {
  const response = await instance.get('/goods/filters/list')
  return response.data
}

const getDesigners = async (): Promise<IDesigner[]> => {
  const response = await instance.get(`/designers`)
  return response.data
}

export const filtersService = {
  getDesigners,
  getFilters
}
