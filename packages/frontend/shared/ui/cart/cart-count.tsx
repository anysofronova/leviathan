import { cartSelectors } from '#/entities/cart'

export const CartCount = () => {
  const cartProducts = cartSelectors.use.cartGoods()
  let cartCount = 0
  cartProducts.forEach(el => {
    cartCount += el.quantity
  })
  return (
    <div
      className={`absolute -top-2 -right-3 flex h-[20px] w-[20px] items-center justify-center rounded-full bg-black text-sm text-white dark:bg-white dark:text-black ${
        cartCount === 0 ? 'hidden' : ''
      }`}
    >
      {cartCount}
    </div>
  )
}
