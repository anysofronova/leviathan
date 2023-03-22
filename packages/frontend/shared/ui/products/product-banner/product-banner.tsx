import Link from 'next/link'
import { FC } from 'react'

import { Good } from '#/shared/types'

interface IProps {
  goods: Good[]
}
export const ProductBanner: FC<IProps> = ({ goods }) => {
  return (
    <div className='relative flex overflow-x-hidden bg-black'>
      <div className='flex h-[300px] animate-bannerAnim whitespace-nowrap text-black'>
        {goods.map(({ productImage, name, id }) => {
          return (
            <div key={id} className='relative mr-auto flex h-full min-w-[400px] items-center md:min-w-[500px]'>
              <img src={productImage} className='h-full' alt='img' />
              <Link
                href={`/product/${id}`}
                className='absolute right-1/2 translate-x-1/2 bg-white py-2 px-10 text-2xl font-bold'
              >
                {name}
              </Link>
            </div>
          )
        })}
      </div>

      <div className='absolute top-0 flex h-[300px] animate-bannerAnim2 whitespace-nowrap text-black'>
        {goods.map(({ productImage, name, id }) => {
          return (
            <div key={id} className='relative mr-auto flex h-full min-w-[400px] items-center md:min-w-[500px]'>
              <img src={productImage} className='h-full' alt='img' />
              <Link
                href={`/product/${id}`}
                className='absolute right-1/2 translate-x-1/2 bg-white py-2 px-10 text-2xl font-bold'
              >
                {name}
              </Link>
            </div>
          )
        })}
      </div>
    </div>
  )
}
