import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import { BiCheck } from 'react-icons/bi'

import { authSelectors, modalSelectors, useGoods } from '#/entities'
import { cartSelectors } from '#/entities/cart'
import { Accordion } from '#/shared/ui'

export const SingleProductInfo = () => {
  const good = useGoods(state => state.good)
  const [clothesSize, setClothesSize] = useState('')
  const [clothesColor, setClothesColor] = useState('')
  const user = authSelectors.use.user()
  const toggleAuth = modalSelectors.use.toggleAuth()
  const toggleCart = modalSelectors.use.toggleCart()
  const addToCart = cartSelectors.use.addCartGoods()
  const router = useRouter()

  const clearClothesSelection = useCallback(() => {
    setClothesColor('')
    setClothesSize('')
  }, [])

  useEffect(() => {
    router.events.on('routeChangeComplete', clearClothesSelection)
    return () => {
      router.events.off('routeChangeComplete', clearClothesSelection)
    }
  }, [clearClothesSelection, good, router.events])

  return (
    <>
      <div className='flex w-full flex-col bg-white p-6 text-black dark:bg-black dark:text-white lg:w-2/5'>
        <div className='mb-3 font-medium'>
          <p className='mb-2'>SIZE</p>
          {good ? (
            <div className='flex'>
              {good?.sizes?.map((size, i) => {
                if (size !== 'ONE_SIZE') {
                  return (
                    <button
                      key={size}
                      className={`m-1 flex min-h-[50px] min-w-[50px] cursor-pointer items-center justify-center rounded-full transition hover:scale-110 hover:bg-gray-100 dark:hover:bg-gray-1000 ${
                        clothesSize === size || (clothesSize === '' && i === 0)
                          ? 'border-2 border-black dark:border-white'
                          : 'border border-gray-500'
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
              {good?.colors?.map((color, i) => {
                return (
                  <button
                    key={color}
                    className={`m-1 flex min-h-[50px] min-w-[50px] cursor-pointer items-center justify-center rounded-full transition-all hover:scale-110 ${
                      clothesColor === color || (clothesColor === '' && i === 0)
                        ? 'border-2 border-black dark:border-white'
                        : 'border border-gray-500'
                    }`}
                    style={{ backgroundColor: color, color: color === '#000' ? '#fff' : '#000' }}
                    onClick={() => setClothesColor(color)}
                  >
                    {clothesColor === color && <BiCheck size={36} />}
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
              toggleCart(true)
              addToCart({
                color: clothesColor === '' ? good.colors[0] : clothesColor,
                name: good.name,
                price: good.price,
                productImage: good.productImage,
                size: clothesSize === '' ? (good.sizes[0] as string) : clothesSize,
                id: good.id
              })
            } else {
              toggleAuth(true)
            }
          }}
        >
          Add to cart
        </button>
        <Accordion
          sections={[
            { title: 'Care', content: good?.care || '' },
            { title: 'Details', content: good?.details || '' }
          ]}
        />
      </div>
    </>
  )
}
