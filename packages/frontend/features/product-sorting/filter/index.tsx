'use client'

import React from 'react'
import { v4 } from 'uuid'

import { LinkSelect } from '#/shared/ui/link-select'

export const ProductsFilter = () => {
  const options = [
    { name: 'Relevance' },
    { name: 'Trending' },
    { name: 'Latest arrivals' },
    { name: 'Price: Low to high' },
    { name: 'Price: High to low' }
  ]
  return (
    <>
      <div className='ml-8 hidden min-w-[150px] flex-col space-y-4 lg:flex'>
        <p className='text-md cursor-pointer font-bold'>Relevance</p>
        <p className='cursor-pointer text-sm text-gray-500'>Trending</p>
        <p className='cursor-pointer text-sm text-gray-500'>Latest arrivals</p>
        <p className='cursor-pointer text-sm text-gray-500'>Price: Low to high</p>
        <p className='cursor-pointer text-sm text-gray-500'>Price: High to low</p>
      </div>
      <div className='relative left-0 z-40 mb-4 lg:hidden'>
        <LinkSelect selected='Relevance'>
          {options.map(el => {
            return (
              <p
                key={v4()}
                className='block p-3 text-sm text-gray-500 transition-all hover:bg-gray-100 hover:text-black hover:underline'
              >
                {el.name}
              </p>
            )
          })}
        </LinkSelect>
      </div>
    </>
  )
}
