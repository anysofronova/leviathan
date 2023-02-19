import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type TypeSize = 'XS' | 'S' | 'M' | 'L' | 'XL'

type TypeColors = '#fff' | '#000' | '#FFFF00'

type TInitState = {
  products: {
    id: number
    img: string
    name: string
    price: number
    description: string
    colors: TypeColors[]
    stars: number
    images: string[]
    care: string
    details: string
    size: TypeSize[]
    children: { id: number; img: string; name: string }[]
  }[]
  product:
    | {
        id: number
        img: string
        name: string
        price: number
        description: string
        colors: TypeColors[]
        stars: number
        images: string[]
        care: string
        details: string
        size: TypeSize[]
        children: { id: number; img: string; name: string }[]
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
      price: 39.99,
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      colors: ['#fff', '#000'],
      stars: 4,
      images: ['/static/hoodie.png', '/static/hoodie.png', '/static/hoodie.png'],
      care: 'orem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat',
      details:
        'orem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      size: ['XS', 'S', 'M', 'L', 'XL'],
      children: [
        { id: 2, img: '/static/hoodie2.png', name: 'hoodie2' },
        { id: 3, img: '/static/hoodie3.png', name: 'hoodie3' },
        { id: 4, img: '/static/hoodie4.png', name: 'hoodie4' }
      ]
    },
    {
      id: 2,
      img: '/static/hoodie2.png',
      name: 'hoodie2',
      price: 19.99,
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      colors: ['#FFFF00', '#000'],
      stars: 5,
      images: ['/static/hoodie2.png', '/static/hoodie2.png', '/static/hoodie2.png'],
      care: 'orem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat',
      details:
        'orem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      size: ['XS', 'S', 'M', 'L', 'XL'],
      children: [
        { id: 1, img: '/static/hoodie.png', name: 'hoodie1' },
        { id: 3, img: '/static/hoodie3.png', name: 'hoodie3' },
        { id: 4, img: '/static/hoodie4.png', name: 'hoodie4' }
      ]
    },
    {
      id: 3,
      img: '/static/hoodie3.png',
      name: 'hoodie3',
      price: 17.99,
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      colors: ['#FFFF00'],
      stars: 3,
      images: ['/static/hoodie3.png', '/static/hoodie3.png', '/static/hoodie3.png'],
      care: 'orem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat',
      details:
        'orem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      size: ['XS', 'S', 'M', 'L', 'XL'],
      children: [
        { id: 1, img: '/static/hoodie.png', name: 'hoodie1' },
        { id: 2, img: '/static/hoodie2.png', name: 'hoodie2' },
        { id: 4, img: '/static/hoodie4.png', name: 'hoodie4' }
      ]
    },
    {
      id: 4,
      img: '/static/hoodie4.png',
      name: 'hoodie4',
      price: 27.99,
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      colors: ['#fff', '#FFFF00'],
      stars: 4,
      images: ['/static/hoodie4.png', '/static/hoodie4.png', '/static/hoodie4.png'],
      care: 'orem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat',
      details:
        'orem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      size: ['XS', 'S', 'M', 'L', 'XL'],
      children: [
        { id: 1, img: '/static/hoodie.png', name: 'hoodie1' },
        { id: 2, img: '/static/hoodie2.png', name: 'hoodie2' },
        { id: 3, img: '/static/hoodie3.png', name: 'hoodie3' }
      ]
    }
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
