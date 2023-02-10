'use client'

import { useModal } from '#/shared/hooks'
import { AuthModal, GlobalNav, HeaderLogo, SearchInput, ShoppingCartOptions, SidebarCart } from '#/shared/ui'

export const Header = () => {
  const { show: showAuthForm, isShowing: isFormShowing, hide: hideAuthForm } = useModal()
  const { show: showCart, isShowing: isCartShowing, hide: hideCart } = useModal()

  return (
    <>
      <div className='mx-auto flex h-[42px] max-w-[2000px] items-center justify-between border-b py-9 px-3 md:px-6'>
        <div className='flex w-full min-w-[280px] max-w-[325px] items-center'>
          <HeaderLogo />
          <GlobalNav />
        </div>
        <SearchInput />
        <ShoppingCartOptions showCart={showCart} showAuthForm={showAuthForm} />
      </div>
      {isCartShowing ? <SidebarCart hideCart={hideCart} showAuthForm={showAuthForm} showCart={showCart} /> : null}
      {isFormShowing ? <AuthModal hideAuthForm={hideAuthForm} /> : null}
    </>
  )
}
