import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type TypeSize = 'XS' | 'S' | 'M' | 'L' | 'XL'

type TypeColors = '#fff' | '#000' | '#FFFF00'

type TInitState = {
  cart: {
    id: number
    cartId: number
    img: string
    name: string
    price: number
    colors: string[]
    size: string[]
    amount: number
  }[]
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
  cart: [],
  product: undefined,
  products: [
    {
      id: 1,
      img: 'https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0434%2F0285%2F4564%2Fproducts%2FCup-front-black.png%3Fv%3D1623159405&w=640&q=85',
      name: 'product1',
      price: 39.99,
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      colors: ['#fff', '#000'],
      stars: 4,
      images: [
        'https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0434%2F0285%2F4564%2Fproducts%2FCup-front-black.png%3Fv%3D1623159405&w=640&q=85',
        'https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0434%2F0285%2F4564%2Fproducts%2FCup-front-black.png%3Fv%3D1623159405&w=640&q=85',
        'https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0434%2F0285%2F4564%2Fproducts%2FCup-front-black.png%3Fv%3D1623159405&w=640&q=85'
      ],
      care: 'orem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat',
      details:
        'orem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      size: ['XS', 'S', 'M', 'L', 'XL'],
      children: [
        {
          id: 2,
          img: 'https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0434%2F0285%2F4564%2Fproducts%2FSticker-mock.png%3Fv%3D1623256356&w=640&q=85',
          name: 'product2'
        },
        {
          id: 3,
          img: 'https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0434%2F0285%2F4564%2Fproducts%2Fshort-sleeve-t-shirt-0.png%3Fv%3D1622902418&w=640&q=85',
          name: 'product3'
        },
        {
          id: 4,
          img: 'https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0434%2F0285%2F4564%2Fproducts%2FCup-front-black.png%3Fv%3D1623159405&w=640&q=85',
          name: 'product4'
        }
      ]
    },
    {
      id: 2,
      img: 'https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0434%2F0285%2F4564%2Fproducts%2FSticker-mock.png%3Fv%3D1623256356&w=640&q=85',
      name: 'product2',
      price: 19.99,
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      colors: ['#FFFF00', '#000'],
      stars: 5,
      images: [
        'https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0434%2F0285%2F4564%2Fproducts%2FSticker-mock.png%3Fv%3D1623256356&w=640&q=85',
        'https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0434%2F0285%2F4564%2Fproducts%2FSticker-mock.png%3Fv%3D1623256356&w=640&q=85',
        'https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0434%2F0285%2F4564%2Fproducts%2FSticker-mock.png%3Fv%3D1623256356&w=640&q=85'
      ],
      care: 'orem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat',
      details:
        'orem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      size: ['XS', 'S', 'M', 'L', 'XL'],
      children: [
        {
          id: 1,
          img: 'https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0434%2F0285%2F4564%2Fproducts%2FCup-front-black.png%3Fv%3D1623159405&w=640&q=85',
          name: 'product1'
        },
        {
          id: 3,
          img: 'https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0434%2F0285%2F4564%2Fproducts%2Fshort-sleeve-t-shirt-0.png%3Fv%3D1622902418&w=640&q=85',
          name: 'product3'
        },
        {
          id: 4,
          img: 'https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0434%2F0285%2F4564%2Fproducts%2FCup-front-black.png%3Fv%3D1623159405&w=640&q=85',
          name: 'product4'
        }
      ]
    },
    {
      id: 3,
      img: 'https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0434%2F0285%2F4564%2Fproducts%2Fshort-sleeve-t-shirt-0.png%3Fv%3D1622902418&w=640&q=85',
      name: 'product3',
      price: 17.99,
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      colors: ['#FFFF00'],
      stars: 3,
      images: [
        'https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0434%2F0285%2F4564%2Fproducts%2Fshort-sleeve-t-shirt-0.png%3Fv%3D1622902418&w=640&q=85',
        'https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0434%2F0285%2F4564%2Fproducts%2Fshort-sleeve-t-shirt-4.png%3Fv%3D1622902418&w=640&q=85',
        'https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0434%2F0285%2F4564%2Fproducts%2Fshort-sleeve-t-shirt-2.png%3Fv%3D1622902418&w=640&q=85'
      ],
      care: 'orem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat',
      details:
        'orem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      size: ['XS', 'S', 'M', 'L', 'XL'],
      children: [
        {
          id: 1,
          img: 'https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0434%2F0285%2F4564%2Fproducts%2FCup-front-black.png%3Fv%3D1623159405&w=640&q=85',
          name: 'product1'
        },
        {
          id: 2,
          img: 'https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0434%2F0285%2F4564%2Fproducts%2FSticker-mock.png%3Fv%3D1623256356&w=640&q=85',
          name: 'product2'
        },
        {
          id: 4,
          img: 'https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0434%2F0285%2F4564%2Fproducts%2FCup-front-black.png%3Fv%3D1623159405&w=640&q=85',
          name: 'product4'
        }
      ]
    },
    {
      id: 4,
      img: 'https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0434%2F0285%2F4564%2Fproducts%2FCup-front-black.png%3Fv%3D1623159405&w=640&q=85',
      name: 'product4',
      price: 27.99,
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      colors: ['#fff', '#FFFF00'],
      stars: 4,
      images: [
        'https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0434%2F0285%2F4564%2Fproducts%2FCup-front-black.png%3Fv%3D1623159405&w=640&q=85',
        'https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0434%2F0285%2F4564%2Fproducts%2FCup-front-black.png%3Fv%3D1623159405&w=640&q=85',
        'https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0434%2F0285%2F4564%2Fproducts%2FCup-front-black.png%3Fv%3D1623159405&w=640&q=85'
      ],
      care: 'orem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat',
      details:
        'orem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      size: ['XS', 'S', 'M', 'L', 'XL'],
      children: [
        {
          id: 1,
          img: 'https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0434%2F0285%2F4564%2Fproducts%2FCup-front-black.png%3Fv%3D1623159405&w=640&q=85',
          name: 'product1'
        },
        {
          id: 2,
          img: 'https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0434%2F0285%2F4564%2Fproducts%2FSticker-mock.png%3Fv%3D1623256356&w=640&q=85',
          name: 'product2'
        },
        {
          id: 3,
          img: 'https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0434%2F0285%2F4564%2Fproducts%2Fshort-sleeve-t-shirt-0.png%3Fv%3D1622902418&w=640&q=85',
          name: 'product3'
        }
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
    },
    incrementItemAmount: (state: TInitState, action: PayloadAction<{ id: number }>) => {
      const { id } = action.payload
      const item = state.cart.find(item => item.cartId === id)
      if (item) {
        item.amount += 1
      }
    },
    decrementItemAmount: (state: TInitState, action: PayloadAction<{ id: number }>) => {
      const { id } = action.payload
      const item = state.cart.find(item => item.cartId === id)
      if (item && item.amount > 1) {
        item.amount -= 1
      }
    },
    removeCartItem: (state: TInitState, action: PayloadAction<{ id: number }>) => {
      const { id } = action.payload
      state.cart = state.cart.filter(item => item.cartId !== id)
    },
    addCartItem: (
      state: TInitState,
      action: PayloadAction<{
        id: number
        cartId: number
        img: string
        name: string
        price: number
        color: string
        size: string
        amount: number
      }>
    ) => {
      state.cart.push({
        id: action.payload.id,
        cartId: action.payload.cartId,
        img: action.payload.img,
        name: action.payload.name,
        price: action.payload.price,
        colors: [action.payload.color],
        size: [action.payload.size],
        amount: 1
      })
    }
  }
})

export const { getOneProduct, incrementItemAmount, decrementItemAmount, removeCartItem, addCartItem } =
  productsSlice.actions
export const ProductsReducer = productsSlice.reducer
