import { useEffect } from 'react'
import { CgClose } from 'react-icons/cg'
import { FiShoppingCart } from 'react-icons/fi'

import { modalSelectors } from '#/entities'
import { cartSelectors } from '#/entities/cart'
import { CartContent, CartCount, EmptyCartMessage } from '#/shared/ui'

export const Cart = () => {
  const cartProducts = cartSelectors.use.cartGoods()
  const toggleCart = modalSelectors.use.toggleCart()
  const toggleAuth = modalSelectors.use.toggleAuth()

  useEffect(() => {
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [])
  return (
    <>
      <div className='h-modal fixed inset-0 top-0 left-0 right-0 z-[70] h-full w-full overflow-y-auto overflow-x-hidden bg-black p-4 opacity-50' />
      <div className='fixed right-0  top-0 z-[80] flex h-full min-h-full w-full flex-col bg-white text-black dark:bg-black dark:text-white md:w-[400px]'>
        <div className='flex items-center justify-between px-3 py-5 md:px-6'>
          <button
            type='button'
            className='inline-flex items-center rounded-lg hover:opacity-50'
            onClick={() => toggleCart(false)}
          >
            <CgClose size={22} />
            Close
          </button>
          <div className='flex w-full max-w-[300px] items-center justify-end'>
            <button type='button' className='relative mr-6' onClick={() => toggleCart(true)}>
              <FiShoppingCart size={22} />
              <CartCount />
            </button>
            <button
              type='button'
              id='auth-btn'
              className='box-border h-[34px] w-[34px] rounded-3xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transition-colors hover:from-indigo-700 hover:via-purple-800 hover:to-pink-700'
              onClick={() => toggleAuth(true)}
            />
          </div>
        </div>
        {cartProducts?.length === 0 ? <EmptyCartMessage /> : <CartContent />}
      </div>
    </>
  )
}
