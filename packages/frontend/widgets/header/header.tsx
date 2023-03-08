'use client'

import { modalsAuthStateSelector, modalsCartStateSelector } from '#/entities'
import { useAppSelector, useAuth } from '#/shared/hooks'
import { AuthModal, GlobalNav, HeaderLogo, SearchInput, ShoppingCartOptions } from '#/shared/ui'

import { Cart } from '../cart'

export const Header = () => {
  const showAuth = useAppSelector(modalsAuthStateSelector)
  const showCart = useAppSelector(modalsCartStateSelector)
  const user = useAuth()

  return (
    <>
      <div className='fixed top-0 right-1/2 z-[70] w-full translate-x-1/2 bg-white dark:bg-black'>
        <div className='grid-cols-[60%, 40%] mx-auto grid w-full max-w-[2000px] grid-rows-2 items-center gap-4 bg-white py-3 px-3 text-black dark:bg-black md:px-6 lg:h-[40px] lg:grid-cols-3 lg:grid-rows-1 lg:py-9'>
          <div className='flex w-full min-w-[240px] max-w-[325px] items-center'>
            <HeaderLogo />
            <GlobalNav />
          </div>
          <SearchInput />
          <div className='flex justify-end'>
            <ShoppingCartOptions />
          </div>
        </div>
      </div>
      {showAuth ? <AuthModal /> : null}
      {showCart && user ? <Cart /> : null}
    </>
  )
}
