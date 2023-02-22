import { MdOutlineClose } from 'react-icons/md'
import { v4 } from 'uuid'

import { cartStateSelector, decrementItemAmount, incrementItemAmount, removeCartItem } from '#/entities'
import { useAppDispatch, useAppSelector } from '#/shared/hooks'

export const CartContent = () => {
  const dispatch = useAppDispatch()
  const cartProducts = useAppSelector(cartStateSelector)
  const taxes = 2
  let subtotal = 0
  cartProducts.forEach(el => {
    subtotal += el.price * el.amount
  })
  return (
    <>
      <div className='mt-3 max-h-[70%] overflow-y-scroll px-6'>
        <h2 className='mb-4 text-2xl font-bold'>My Cart</h2>
        <div className='flex flex-col'>
          {cartProducts.map(el => {
            return (
              <div key={v4()} className='mb-2 border-b pb-5'>
                <div className='mb-2 flex items-center justify-between'>
                  <div className='mr-3 w-[135px] bg-purple-700'>
                    <img src={el.img} alt='img' className='w-full' />
                  </div>
                  <div className='w-full text-left font-medium'>
                    <h3 className='mb-0.5 block text-xl'>{el.name}</h3>
                    <div className='mb-0.5 flex items-center'>
                      <span>Size:</span>
                      <div className='flex'>
                        {el.size.map(sz => {
                          return (
                            <div
                              key={v4()}
                              className='mx-0.5 flex min-h-[22px] min-w-[22px] items-center justify-center rounded-full border border-gray-400 p-0.5 text-[11px] font-black'
                            >
                              {sz}
                            </div>
                          )
                        })}
                      </div>
                    </div>
                    <div className='flex items-center'>
                      Color:
                      {el.colors.map(color => {
                        return (
                          <div
                            key={v4()}
                            className='mx-0.5 flex min-h-[22px] min-w-[22px] items-center justify-center rounded-full border border-gray-400 p-0.5'
                            style={{ backgroundColor: color }}
                          />
                        )
                      })}
                    </div>
                  </div>
                  <div>${el.price}</div>
                </div>
                <div className='flex'>
                  <button
                    className='mr-2 block flex h-[35px] min-w-[35px] items-center justify-center border'
                    onClick={() => dispatch(removeCartItem({ id: el.cartId }))}
                  >
                    <MdOutlineClose size={22} />
                  </button>
                  <div className='flex w-full items-center border pl-2'>
                    <div className='mr-auto'>{el.amount}</div>
                    <button
                      className='h-full min-w-[35px] border-l text-xl'
                      onClick={() => dispatch(decrementItemAmount({ id: el.cartId }))}
                    >
                      -
                    </button>
                    <button
                      className='h-full min-w-[35px] border-l text-xl'
                      onClick={() => dispatch(incrementItemAmount({ id: el.cartId }))}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
      <div className='mt-auto flex h-[25%] flex-col justify-between border-t bg-white p-6 dark:bg-[#171923]'>
        <div className='border-b pb-3'>
          <div className='flex justify-between'>
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className='flex justify-between'>
            <span>Taxes</span>
            <span>${taxes.toFixed(2)}</span>
          </div>
          <div className='flex justify-between'>
            <span>Shipping</span>
            <span className='font-bold'>FREE</span>
          </div>
        </div>
        <div className='flex justify-between font-bold'>
          <span>Total</span>
          <span>${(subtotal + taxes).toFixed(2)}</span>
        </div>
        <button className='bg-black p-3 text-sm font-bold text-white'>PROCEED TO CHECKOUT</button>
      </div>
    </>
  )
}
