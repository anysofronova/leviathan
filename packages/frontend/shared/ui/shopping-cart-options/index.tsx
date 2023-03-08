'use client'

import { FiShoppingCart } from 'react-icons/fi'

import { showAuth, showCart } from '#/entities'
import { useAppDispatch, useAuth } from '#/shared/hooks'
import { CartCount } from '#/shared/ui'

export const ShoppingCartOptions = () => {
  const dispatch = useAppDispatch()
  const user = useAuth()
  return (
    <div className='flex w-full max-w-[300px] items-center justify-end'>
      {user ? (
        <button type='button' className='relative mr-6 dark:text-white' onClick={() => dispatch(showCart())}>
          <FiShoppingCart size={22} />
          <CartCount />
        </button>
      ) : null}
      <button
        type='button'
        id='auth-btn'
        className='box-border h-[34px] w-[34px] rounded-3xl border-2 border-transparent bg-green-400 transition-colors hover:border-black'
        onClick={() => dispatch(showAuth())}
      />
    </div>
  )
}
