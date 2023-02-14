import React from 'react'

export const Product = ({ name, price, img }: { id?: number; name: string; price: number; img: string }) => {
  return (
    <div className='relative w-full cursor-pointer overflow-hidden p-4 lg:max-w-[300px]'>
      <div className='absolute left-0 top-0 z-10 bg-white font-bold transition-colors hover:bg-black hover:text-white'>
        <div className='px-3 py-1.5 text-4xl lg:text-xl'>{name}</div>
        <div className='px-3 py-1.5 text-2xl lg:text-base'>${price} USD</div>
      </div>
      <img src={img} alt='img' className='w-full transition-all hover:scale-110' />
    </div>
  )
}