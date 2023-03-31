import { cartSelectors } from '#/entities/cart'

export const CartInfo = () => {
  const total = cartSelectors.use.cartGoods().reduce((acc, el) => {
    return Number(el.price) * el.quantity + acc
  }, 0)
  return (
    <div className='mt-auto flex h-[25%] flex-col justify-between border-t bg-white p-6 dark:bg-black'>
      <div className='border-b pb-3'>
        <div className='flex justify-between'>
          <span>Shipping</span>
          <span className='font-bold'>FREE</span>
        </div>
      </div>
      <div className='my-3 flex justify-between font-bold'>
        <span>Total</span>
        <span>${total}</span>
      </div>
      <button className='bg-black p-3 text-sm font-bold text-white dark:bg-white dark:text-black'>
        PROCEED TO CHECKOUT
      </button>
    </div>
  )
}
