import { useEffect } from 'react'
import { CgClose } from 'react-icons/cg'
import { FiShoppingCart } from 'react-icons/fi'

import { useModal } from '#/entities'
import { CartContent, CartCount, EmptyCartMessage } from '#/shared/ui'

export const Cart = () => {
  const cartProducts: any = []
  const [hideCart, showAuth, showCart] = useModal(state => [state.hideCart, state.showAuth, state.showCart])

  useEffect(() => {
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [])
  return (
    <>
      <div className='h-modal fixed inset-0 top-0 left-0 right-0 z-[70] h-full w-full overflow-y-auto overflow-x-hidden bg-black p-4 opacity-50' />
      <div className='fixed right-0  top-0 z-[80] flex h-full min-h-full w-full flex-col bg-white text-black dark:bg-[#171923] dark:text-white md:w-[400px]'>
        <div className='flex items-center justify-between px-3 py-5 md:px-6'>
          <button
            type='button'
            className='inline-flex items-center rounded-lg hover:opacity-50'
            onClick={() => hideCart()}
          >
            <CgClose size={22} />
            Close
          </button>
          <div className='flex w-full max-w-[300px] items-center justify-end'>
            <button type='button' className='relative mr-6' onClick={() => showCart()}>
              <FiShoppingCart size={22} />
              <CartCount />
            </button>
            <button
              type='button'
              className='box-border h-[34px] w-[34px] rounded-3xl border-2 border-transparent bg-green-400 transition-colors hover:border-black'
              onClick={() => showAuth()}
            />
          </div>
        </div>
        {cartProducts?.length === 0 ? <EmptyCartMessage /> : <CartContent />}
      </div>
    </>
  )
}
