import React from 'react'
import { HiOutlineArrowNarrowLeft, HiOutlineArrowNarrowRight } from 'react-icons/hi'
import { v4 } from 'uuid'

import { productStateSelector } from '#/entities'
import { useAppSelector } from '#/shared/hooks'

export const ProductSlider = () => {
  const product = useAppSelector(productStateSelector)
  return (
    <div className='w-full lg:w-3/5'>
      <div className='flex flex-col bg-purple-700'>
        <div className='relative mb-10 flex items-center justify-center p-10'>
          <div className='absolute left-0 top-0'>
            <div className='bg-white py-3 px-4 text-4xl font-bold'>{product?.name}</div>
            <div className='text-md w-max bg-white py-3 px-4 font-bold'>${product?.price} USD</div>
          </div>
          <img src={product?.img} alt='img' className='w-full max-w-[450px]' />
          <div className='absolute right-10 bottom-0 text-white'>
            <button className='border-2 border-r-0 border-white bg-purple-700 py-3 px-6 transition-colors hover:bg-purple-900'>
              <HiOutlineArrowNarrowLeft size={32} />
            </button>
            <button className='border-2 border-white bg-purple-700 py-3 px-6 transition-colors hover:bg-purple-900'>
              <HiOutlineArrowNarrowRight size={32} />
            </button>
          </div>
        </div>
        <div className='flex bg-purple-900'>
          {product?.images.map(el => {
            return (
              <div key={v4()} className='w-[250px] p-2'>
                <img src={el} alt='img' className='w-full max-w-[200px]' />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
