import React, { FC } from 'react'

interface IProps {
  mockItems: { id: number; img: string; price: number; name: string }[]
}

export const ProductCells: FC<IProps> = ({ mockItems }) => {
  return (
    <>
      <div className='relative flex w-full items-center justify-center bg-[#7928CA] p-20 lg:w-4/6'>
        <div className='absolute top-0 left-0 cursor-pointer'>
          <div className='border-b bg-white p-2 text-4xl font-bold text-black'>{mockItems[0]?.name}</div>
          <div className='bg-white p-2 text-xl text-black'>{mockItems[0]?.price}$</div>
        </div>
        <div className='w-full transition-all hover:scale-110'>
          <img src={mockItems[0]?.img} width='100%' alt='img' />
        </div>
      </div>
      <div className='w-full lg:w-2/6'>
        <div className='relative flex items-center justify-center bg-black p-20 lg:h-1/2'>
          <div className='absolute top-0 left-0 cursor-pointer'>
            <div className='border-b bg-white p-2 text-4xl font-bold text-black'>{mockItems[1]?.name}</div>
            <div className='bg-white p-2 text-xl text-black'>{mockItems[1]?.price}$</div>
          </div>
          <div className='w-full transition-all hover:scale-110'>
            <img src={mockItems[1]?.img} width='100%' alt='img' />
          </div>
        </div>
        <div className='relative flex h-1/2 items-center justify-center bg-[#FF0080] p-20'>
          <div className='absolute top-0 left-0 cursor-pointer'>
            <div className='border-b bg-white p-2 text-4xl font-bold text-black'>{mockItems[2]?.name}</div>
            <div className='bg-white p-2 text-xl text-black'>{mockItems[2]?.price}$</div>
          </div>
          <div className='w-full transition-all hover:scale-110'>
            <img src={mockItems[2]?.img} width='100%' alt='img' />
          </div>
        </div>
      </div>
    </>
  )
}
