'use client'

import { useModal } from '#/shared/hooks'
import { AuthModal, GlobalNav, HeaderLogo, SearchInput, ShoppingCartOptions, SidebarCart } from '#/shared/ui'

export const Header = () => {
  const { show: showAuthForm, isShowing: isFormShowing, hide: hideAuthForm } = useModal()
  const { show: showCart, isShowing: isCartShowing, hide: hideCart } = useModal()

  return (
    <>
      <div className='grid-cols-[60%, 40%] fixed top-0 right-1/2 z-[70] grid h-[120px] w-full max-w-[2000px] translate-x-1/2 grid-rows-2 items-center gap-4 bg-white py-9 px-3 md:px-6 lg:h-[40px] lg:grid-cols-3 lg:grid-rows-1'>
        <div className='flex w-full min-w-[240px] max-w-[325px] items-center text-sm sm:text-base'>
          <HeaderLogo />
          <GlobalNav />
        </div>
        <SearchInput />
        <div className='flex justify-end'>
          <ShoppingCartOptions showCart={showCart} showAuthForm={showAuthForm} />
        </div>
      </div>
      {isCartShowing ? <SidebarCart hideCart={hideCart} showAuthForm={showAuthForm} showCart={showCart} /> : null}
      {isFormShowing ? <AuthModal hideAuthForm={hideAuthForm} /> : null}
    </>
  )
}
