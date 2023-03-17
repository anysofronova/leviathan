import { instance } from '../http'

const getProducts = async () => {
  const response = await instance.get('/goods/list')
  console.log(response)
  return response.data
}

export const productsService = {
  getProducts
}
