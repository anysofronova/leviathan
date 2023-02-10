'use client'

import { useModal } from '#/shared/hooks'
import { AuthModal, GlobalNav, HeaderLogo, SearchInput, ShoppingCartOptions, SidebarCart } from '#/shared/ui'

export const Header = () => {
  const { show: showAuthForm, isShowing: isFormShowing, hide: hideAuthForm } = useModal()
  const { show: showCart, isShowing: isCartShowing, hide: hideCart } = useModal()

  return (
    <>
      <div className='mx-auto grid h-[120px] max-w-[2000px] grid-cols-2 grid-rows-2 items-center gap-4 border-b py-9 px-3 md:px-6 lg:h-[42px] lg:grid-cols-3 lg:grid-rows-1'>
        <div className='flex w-full min-w-[280px] max-w-[325px] items-center'>
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
