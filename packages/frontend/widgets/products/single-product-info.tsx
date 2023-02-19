'use client'

import React, { useState } from 'react'
import { v4 } from 'uuid'

import { productStateSelector } from '#/entities'
import { useAppSelector } from '#/shared/hooks'
import { Accordion } from '#/shared/ui'

type TypeSize = 'XS' | 'S' | 'M' | 'L' | 'XL'
export const SingleProductInfo = () => {
  const product = useAppSelector(productStateSelector)
  const [clothesSize, setClothesSize] = useState<TypeSize | null>()
  return (
    <>
      <div className='flex w-full flex-col bg-white p-6 lg:w-2/5'>
        <div className='mb-3 font-bold'>
          <p className='mb-2'>SIZE</p>
          <div className='flex'>
            {product?.size.map(size => {
              return (
                <button
                  key={v4()}
                  className={`m-1 flex min-h-[50px] min-w-[50px] cursor-pointer items-center justify-center rounded-full transition-all hover:scale-110 ${
                    clothesSize === size ? 'border-2 border-black' : 'border border-gray-500'
                  }`}
                  onClick={() => setClothesSize(size)}
                >
                  {size}
                </button>
              )
            })}
          </div>
        </div>
        <div className='mb-2 font-bold'>
          <p className='mb-2'>COLOR</p>
          <div className='flex'>
            {product?.colors.map(color => {
              return (
                <div
                  key={v4()}
                  className={`m-1 min-h-[50px] min-w-[50px] cursor-pointer rounded-full border border-gray-500 bg-[${color}]`}
                />
              )
            })}
          </div>
        </div>
        <div className='mb-6'>{product?.description}</div>
        <button className='mb-4 block bg-black p-4 text-white transition-all hover:opacity-50'>Add to cart</button>
        <Accordion
          sections={[
            { title: 'Care', content: product?.care },
            { title: 'Details', content: product?.details }
          ]}
        />
      </div>
    </>
  )
}
