import Link from 'next/link'
import React, { FC } from 'react'
import { v4 } from 'uuid'

interface IProps {
  mockItems: { id: number; img: string; price: number; name: string }[]
}

export const ProductCells: FC<IProps> = ({ mockItems }) => {
  return (
    <div className='grid w-full lg:grid-flow-col lg:grid-cols-[2fr_1fr] lg:grid-rows-2'>
      {mockItems.slice(0, 3).map(({ name, price, img }, i) => {
        if (i === 0) {
          return (
            <Link
              key={v4()}
              href={`/product/${name}`}
              className='relative row-span-2 block flex w-full items-center justify-center bg-[#7928CA] p-20 lg:w-full'
            >
              <div className='absolute top-0 left-0 cursor-pointer'>
                <div className='border-b bg-white p-2 text-4xl font-bold text-black'>{name}</div>
                <div className='bg-white p-2 text-xl text-black'>{price}$</div>
              </div>
              <div className='w-full transition-all hover:scale-110'>
                <img src={img} width='100%' alt='img' />
              </div>
            </Link>
          )
        }
        return (
          <Link
            key={v4()}
            href={`/product/${name}`}
            className={`relative flex items-center justify-center ${i === 1 && 'bg-black'} p-20`}
          >
            <div className='absolute top-0 left-0 cursor-pointer'>
              <div className='border-b bg-white p-2 text-4xl font-bold text-black'>{name}</div>
              <div className='bg-white p-2 text-xl text-black'>{price}$</div>
            </div>
            <div className='w-full transition-all hover:scale-110'>
              <img src={img} width='100%' alt='img' />
            </div>
          </Link>
        )
      })}
    </div>
  )
}
