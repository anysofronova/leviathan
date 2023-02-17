import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type TInitState = {
  products: {
    id: number
    img: string
    name: string
    price: number
  }[]
  product:
    | {
        id: number
        img: string
        name: string
        price: number
      }
    | undefined
}

const initialState: TInitState = {
  product: undefined,
  products: [
    {
      id: 1,
      img: '/static/hoodie.png',
      name: 'hoodie1',
      price: 39.99
    },
    {
      id: 2,
      img: '/static/hoodie2.png',
      name: 'hoodie2',
      price: 20
    },
    {
      id: 3,
      img: '/static/hoodie3.png',
      name: 'hoodie3',
      price: 13.99
    },
    { id: 4, img: '/static/hoodie4.png', name: 'hoodie4', price: 13 },
    { id: 5, img: '/static/hoodie4.png', name: 'hoodie5', price: 13 },
    { id: 6, img: '/static/hoodie4.png', name: 'hoodie6', price: 13 }
  ]
}

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    getOneProduct(state: TInitState, action: PayloadAction<{ name: string }>) {
      state.product = state.products.find(el => el.name === action.payload.name)
    }
  }
})

export const { getOneProduct } = productsSlice.actions
export const ProductsReducer = productsSlice.reducer
