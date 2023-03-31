import { CartGoodsList, CartInfo } from '#/shared/ui'

export const CartContent = () => {
  return (
    <>
      <div className='mt-3 max-h-[70%] overflow-y-scroll px-6'>
        <h2 className='mb-4 text-2xl font-bold'>My Cart</h2>
        <CartGoodsList />
      </div>
      <CartInfo />
    </>
  )
}
