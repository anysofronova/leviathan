import { MdOutlineClose } from 'react-icons/md'

interface Props {
  quantity: number
  onRemove: () => void
  onAddOrRemove: (add: boolean) => void
}
export const CartGoodButtons = ({ quantity, onRemove, onAddOrRemove }: Props) => {
  return (
    <div className='flex'>
      <button className='mr-2 flex h-[35px] min-w-[35px] items-center justify-center border' onClick={onRemove}>
        <MdOutlineClose size={22} />
      </button>
      <div className='flex w-full items-center border pl-2'>
        <div className='mr-auto'>{quantity}</div>
        <button className='h-full min-w-[35px] border-l text-xl' onClick={() => onAddOrRemove(false)}>
          -
        </button>
        <button className='h-full min-w-[35px] border-l text-xl' onClick={() => onAddOrRemove(true)}>
          +
        </button>
      </div>
    </div>
  )
}
