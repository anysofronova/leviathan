import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { createSelectorFunctions } from '#/shared/lib/selectors'
import { CartGood } from '#/shared/types'

interface ICartStore {
  cartGoods: CartGood[]
  addCartGoods: (good: CartGood) => void
  removeCartGoods: (cartId: number) => void
  addOrRemoveOneCartGood: ({ cartId, add }: { cartId: number; add: boolean }) => void
}

const updateCartGoodQuantity = (cartGood: CartGood, add: boolean) => {
  cartGood.quantity += add ? 1 : cartGood.quantity > 0 ? -1 : 0
}

const createUpdatedCartGoods = (cartGoods: CartGood[], cartGoodIndex: number, cartGood: CartGood) => [
  ...cartGoods.slice(0, cartGoodIndex),
  cartGood,
  ...cartGoods.slice(cartGoodIndex + 1)
]
export const useCart = create(
  persist<ICartStore>(
    (set, get) => ({
      cartGoods: [],
      addCartGoods: good => {
        const { cartGoods } = get()
        const findGood = () => {
          return cartGoods.find(el => el.id === good.id && el.color === good.color && el.size === good.size)
        }
        const foundGood = findGood()
        if (foundGood) {
          foundGood.quantity += 1
        } else {
          set({ cartGoods: [...cartGoods, good] })
        }
      },
      removeCartGoods: cartId => {
        set(state => ({
          cartGoods: state.cartGoods.filter(el => el.cartId !== cartId)
        }))
      },
      addOrRemoveOneCartGood: ({ cartId, add }) => {
        const { cartGoods } = get()
        const cartGoodIndex = cartGoods.findIndex(el => el.cartId === cartId)
        const cartGood = cartGoods[cartGoodIndex]

        if (cartGood) {
          updateCartGoodQuantity(cartGood, add)

          if (cartGood.quantity === 0) {
            set({
              cartGoods: cartGoods.filter(el => el.cartId !== cartId)
            })
          } else {
            const updatedCartGoods = createUpdatedCartGoods(cartGoods, cartGoodIndex, cartGood)
            set({ cartGoods: updatedCartGoods })
          }
        }
      }
    }),
    {
      name: 'cart-storage'
    }
  )
)

export const cartSelectors = createSelectorFunctions(useCart)
