import { createSlice } from '@reduxjs/toolkit'

type TInitState = {
  products: {
    id: number
    img: string
    name: string
    price: number
    clothes: boolean
    featured: boolean
    designer: string
  }[]
}

const initialState: TInitState = {
  products: [
    {
      id: 1,
      img: '/static/hoodie.png',
      name: 'hoodie1',
      price: 39.99,
      clothes: true,
      featured: false,
      designer: 'Vlad'
    },
    {
      id: 2,
      img: '/static/hoodie2.png',
      name: 'hoodie2',
      price: 20,
      clothes: true,
      featured: false,
      designer: 'Maxim'
    },
    {
      id: 3,
      img: '/static/hoodie3.png',
      name: 'hoodie3',
      price: 13.99,
      clothes: true,
      featured: false,
      designer: 'Maxim'
    },
    { id: 4, img: '/static/hoodie4.png', name: 'hoodie4', price: 13, clothes: false, featured: true, designer: 'Anna' },
    { id: 5, img: '/static/hoodie4.png', name: 'hoodie5', price: 13, clothes: false, featured: true, designer: 'Anna' },
    { id: 6, img: '/static/hoodie4.png', name: 'hoodie6', price: 13, clothes: true, featured: true, designer: 'Anna' }
  ]
}

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {}
})

// export const {} = productsSlice.actions
export const ProductsReducer = productsSlice.reducer
