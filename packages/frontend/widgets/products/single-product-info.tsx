'use client'

import React, { useState } from 'react'
import { BiCheck } from 'react-icons/bi'
import { v4 } from 'uuid'

import { addCartItem, productStateSelector, showAuth, showCart } from '#/entities'
import { useAppDispatch, useAppSelector, useAuth } from '#/shared/hooks'
import { Accordion } from '#/shared/ui'

type TypeSize = 'XS' | 'S' | 'M' | 'L' | 'XL'

export const SingleProductInfo = () => {
  const product = useAppSelector(productStateSelector)
  const [clothesSize, setClothesSize] = useState<TypeSize>('XS')
  const [clothesColor, setClothesColor] = useState<{ index: number; color: string }>({
    index: 0,
    color: ''
  })
  const user = useAuth()
  const dispatch = useAppDispatch()
  return (
    <>
      <div className='flex w-full flex-col bg-white p-6 dark:bg-[#171923] lg:w-2/5'>
        <div className='mb-3 font-medium'>
          <p className='mb-2'>SIZE</p>
          <div className='flex'>
            {product?.size.map(size => {
              return (
                <button
                  key={v4()}
                  className={`m-1 flex min-h-[50px] min-w-[50px] cursor-pointer items-center justify-center rounded-full transition hover:scale-110 hover:bg-gray-100 dark:hover:bg-gray-1000 ${
                    clothesSize === size ? 'border-2 border-black dark:border-white' : 'border border-gray-500'
                  }`}
                  onClick={() => setClothesSize(size)}
                >
                  {size}
                </button>
              )
            })}
          </div>
        </div>
        <div className='mb-4 font-medium'>
          <p className='mb-2'>COLOR</p>
          <div className='flex'>
            {product?.colors.map((color, i) => {
              return (
                <button
                  key={v4()}
                  className={`m-1 flex min-h-[50px] min-w-[50px] cursor-pointer items-center justify-center rounded-full transition-all hover:scale-110 ${
                    clothesColor.index === i ? 'border-2 border-black dark:border-white' : 'border border-gray-500'
                  }`}
                  style={{ backgroundColor: color, color: color === '#000' ? '#fff' : '#000' }}
                  onClick={() => setClothesColor({ index: i, color })}
                >
                  {clothesColor.index === i && <BiCheck size={36} />}
                </button>
              )
            })}
          </div>
        </div>
        <div className='mb-6'>{product?.description}</div>
        <button
          className='mb-4 block bg-black p-4 text-white transition-all hover:opacity-50'
          onClick={() => {
            if (user && product && product.colors[0]) {
              dispatch(showCart())
              dispatch(
                addCartItem({
                  id: product.id,
                  cartId: Math.random(),
                  img: product.img,
                  name: product.name,
                  price: product.price,
                  color: clothesColor.color === '' ? product.colors[0] : clothesColor.color,
                  size: clothesSize,
                  amount: 1
                })
              )
            } else {
              dispatch(showAuth())
            }
          }}
        >
          Add to cart
        </button>
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
