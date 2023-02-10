import { FiShoppingCart } from 'react-icons/fi'

type ShoppingCartOptionsProps = {
  showCart: () => void
  showAuthForm: () => void
}
export const ShoppingCartOptions = ({ showCart, showAuthForm }: ShoppingCartOptionsProps) => {
  return (
    <div className='flex w-full max-w-[300px] items-center justify-end'>
      <button type='button' className='mr-6' onClick={showCart}>
        <FiShoppingCart size={22} />
      </button>
      <button
        type='button'
        className='box-border h-[34px] w-[34px] rounded-3xl border-2 border-transparent bg-green-400 transition-colors hover:border-black'
        onClick={showAuthForm}
      />
    </div>
  )
}
