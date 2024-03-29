import { FiShoppingCart } from 'react-icons/fi'

export const EmptyCartMessage = () => {
  return (
    <div className='flex h-screen flex-col items-center justify-center p-6'>
      <div className='mb-4 flex h-[90px] w-[90px] items-center justify-center rounded-full bg-black text-white dark:bg-white dark:text-black'>
        <div className='mr-2'>
          <FiShoppingCart size={32} />
        </div>
      </div>
      <div className='text-2xl font-bold'>Your cart is empty</div>
      <div className='text-center text-gray-400'>Biscuit oat cake wafer icing ice cream tiramisu pudding cupcake.</div>
    </div>
  )
}
