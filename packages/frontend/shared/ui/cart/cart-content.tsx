import { useId } from 'react'
import { MdOutlineClose } from 'react-icons/md'

import { useCart } from '#/entities/cart'

export const CartContent = () => {
  const [cartProducts, removeCartGood] = useCart(state => [state.cartGoods, state.removeCartGoods])
  return (
    <>
      <div className='mt-3 max-h-[70%] overflow-y-scroll px-6'>
        <h2 className='mb-4 text-2xl font-bold'>My Cart</h2>
        <div className='flex flex-col'>
          {cartProducts.map(el => {
            return (
              <div key={useId()} className={`mb-2 pb-5 ${cartProducts.at(-1) === el ? '' : 'border-b'}`}>
                <div className='mb-2 flex items-center justify-between'>
                  <div className='mr-3 w-[100px] bg-purple-700'>
                    <img src={el.productImage} alt='img' className='w-full' />
                  </div>
                  <div className='w-full text-left text-sm font-medium'>
                    <h3 className='mb-0.5 block'>{el.name}</h3>
                    <div className='mb-0.5 flex items-center'>
                      <span>Size:</span>
                      <div className='mx-0.5 flex min-h-[22px] min-w-[22px] items-center justify-center rounded-full border border-gray-400 p-0.5 text-[11px] font-black'>
                        {el.size}
                      </div>
                    </div>
                    <div className='flex items-center'>
                      Color:
                      <div
                        className='mx-0.5 flex min-h-[22px] min-w-[22px] items-center justify-center rounded-full border border-gray-400 p-0.5'
                        style={{ backgroundColor: el.color }}
                      />
                    </div>
                  </div>
                  <div>${el.price}</div>
                </div>
                <div className='flex'>
                  <button
                    className='mr-2 block flex h-[35px] min-w-[35px] items-center justify-center border'
                    onClick={() => removeCartGood(el.id)}
                  >
                    <MdOutlineClose size={22} />
                  </button>
                  <div className='flex w-full items-center border pl-2'>
                    <div className='mr-auto'>1</div>
                    <button className='h-full min-w-[35px] border-l text-xl'>-</button>
                    <button className='h-full min-w-[35px] border-l text-xl'>+</button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
      <div className='mt-auto flex h-[32%] flex-col justify-between border-t bg-white p-6 dark:bg-black'>
        <div className='border-b pb-3'>
          <div className='flex justify-between'>
            <span>Subtotal</span>
            <span>0</span>
          </div>
          <div className='flex justify-between'>
            <span>Taxes</span>
            <span>0</span>
          </div>
          <div className='flex justify-between'>
            <span>Shipping</span>
            <span className='font-bold'>FREE</span>
          </div>
        </div>
        <div className='my-3 flex justify-between font-bold'>
          <span>Total</span>
          <span>0</span>
        </div>
        <button className='bg-black p-3 text-sm font-bold text-white dark:bg-white dark:text-black'>
          PROCEED TO CHECKOUT
        </button>
      </div>
    </>
  )
}
