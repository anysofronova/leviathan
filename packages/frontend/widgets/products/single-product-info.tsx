import { useState } from 'react'
import { BiCheck } from 'react-icons/bi'
import { v4 } from 'uuid'

import { useAuth, useModal } from '#/entities'
import { Good } from '#/shared/types'
import { Accordion } from '#/shared/ui'

interface IProps {
  good: Good
}

export const SingleProductInfo = ({ good }: IProps) => {
  const [clothesSize, setClothesSize] = useState('')
  const [clothesColor, setClothesColor] = useState<{ index: number; color: string }>({
    index: 0,
    color: ''
  })
  const user = useAuth(state => state.user)
  const [showAuth, showCart] = useModal(state => [state.showAuth, state.showCart])

  return (
    <>
      <div className='flex w-full flex-col bg-white p-6 text-black dark:bg-black dark:text-white lg:w-2/5'>
        <div className='mb-3 font-medium'>
          <p className='mb-2'>SIZE</p>
          {good ? (
            <div className='flex'>
              {good.sizes.map(size => {
                if (size !== 'ONE_SIZE') {
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
                } else return null
              })}
            </div>
          ) : (
            <div role='status' className='flex animate-pulse'>
              <div className='m-1 min-h-[50px] min-w-[50px] cursor-pointer rounded-full bg-gray-200 dark:bg-gray-700'></div>
              <div className='m-1 min-h-[50px] min-w-[50px] cursor-pointer rounded-full bg-gray-200 dark:bg-gray-700'></div>
              <div className='m-1 min-h-[50px] min-w-[50px] cursor-pointer rounded-full bg-gray-200 dark:bg-gray-700'></div>
            </div>
          )}
        </div>
        <div className='mb-4 font-medium'>
          <p className='mb-2'>COLOR</p>
          {good ? (
            <div className='flex'>
              {good.colors.map((color, i) => {
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
          ) : (
            <div role='status' className='flex animate-pulse'>
              <div className='m-1 min-h-[50px] min-w-[50px] cursor-pointer rounded-full bg-gray-200 dark:bg-gray-700'></div>
              <div className='m-1 min-h-[50px] min-w-[50px] cursor-pointer rounded-full bg-gray-200 dark:bg-gray-700'></div>
              <div className='m-1 min-h-[50px] min-w-[50px] cursor-pointer rounded-full bg-gray-200 dark:bg-gray-700'></div>
            </div>
          )}
        </div>
        {good ? (
          <div className='mb-6'>{good.description}</div>
        ) : (
          <div role='status' className='mb-6 animate-pulse'>
            <div className='mb-4 h-2.5 w-48 rounded-full bg-gray-200 dark:bg-gray-700'></div>
            <div className='mb-2.5 h-2 rounded-full bg-gray-200 dark:bg-gray-700'></div>
            <div className='mb-2.5 h-2 rounded-full bg-gray-200 dark:bg-gray-700'></div>
            <div className='mb-2.5 h-2 rounded-full bg-gray-200 dark:bg-gray-700'></div>
            <div className='mb-2.5 h-2 rounded-full bg-gray-200 dark:bg-gray-700'></div>
            <div className='mb-2.5 h-2 rounded-full bg-gray-200 dark:bg-gray-700'></div>
            <div className='h-2 rounded-full bg-gray-200 dark:bg-gray-700'></div>
            <span className='sr-only'>Loading...</span>
          </div>
        )}
        <button
          className='mb-4 block bg-black p-6 font-medium text-white transition-all hover:opacity-50 dark:bg-white dark:text-black'
          onClick={() => {
            if (user && good && good.colors[0]) {
              showCart()
            } else {
              showAuth()
            }
          }}
        >
          Add to cart
        </button>
        <Accordion
          sections={[
            { title: 'Care', content: good.care },
            { title: 'Details', content: good.details }
          ]}
        />
      </div>
    </>
  )
}
