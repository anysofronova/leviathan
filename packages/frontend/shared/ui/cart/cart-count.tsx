export const CartCount = () => {
  const cartProducts: any = []
  let cartCount = 0
  cartProducts.forEach((el: any) => {
    cartCount += el.amount
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
