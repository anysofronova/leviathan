import { useEffect, useState } from 'react'
import { FiShoppingCart } from 'react-icons/fi'

import { authSelectors, modalSelectors } from '#/entities'
import { CartCount } from '#/shared/ui'

export const ShoppingCartOptions = () => {
  const [mounted, setMounted] = useState(false)
  const user = authSelectors.use.user()
  const showAuth = modalSelectors.use.toggleAuth()
  const showCart = modalSelectors.use.toggleCart()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }
  return (
    <div className='flex w-full max-w-[300px] items-center justify-end'>
      {user ? (
        <button
          type='button'
          className='relative mr-6 dark:text-white'
          onClick={() => {
            showCart(true)
            showAuth(false)
          }}
        >
          <FiShoppingCart size={22} />
          <CartCount />
        </button>
      ) : null}
      <button
        type='button'
        id='auth-btn'
        className='box-border h-[34px] w-[34px] rounded-3xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transition-colors hover:from-indigo-700 hover:via-purple-800 hover:to-pink-700'
        onClick={() => {
          showAuth(true)
          showCart(false)
        }}
      />
    </div>
  )
}
