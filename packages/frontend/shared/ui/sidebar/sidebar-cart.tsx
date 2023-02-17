import { CgClose } from 'react-icons/cg'
import { FiShoppingCart } from 'react-icons/fi'

import { EmptyCartMessage } from '#/shared/ui'

type SidebarCartProps = {
  hideCart: () => void
  showCart: () => void
  showAuthForm: () => void
}

export const SidebarCart = ({ hideCart, showCart, showAuthForm }: SidebarCartProps) => {
  return (
    <>
      <div className='h-modal fixed inset-0 top-0 left-0 right-0 z-[70] h-full w-full overflow-y-auto overflow-x-hidden bg-black p-4 opacity-50' />
      <div className='fixed right-0  top-0 z-[80] flex min-h-full w-full flex-col bg-white py-4 px-3 md:w-[400px] md:p-4'>
        <div className='flex items-center justify-between py-1 md:px-2'>
          <button type='button' className='inline-flex items-center rounded-lg hover:opacity-50' onClick={hideCart}>
            <CgClose size={22} />
            Close
          </button>
          <div className='flex w-full max-w-[300px] items-center justify-end'>
            <button type='button' className='mr-6' onClick={showCart}>
              <FiShoppingCart size={22} />
            </button>
            <button
              type='button'
              className='box-border h-[34px] w-[34px] rounded-3xl border-2 border-transparent bg-green-400 transition-colors hover:border-black'
              onClick={() => {
                hideCart()
                showAuthForm()
              }}
            />
          </div>
        </div>
        <EmptyCartMessage />
      </div>
    </>
  )
}
