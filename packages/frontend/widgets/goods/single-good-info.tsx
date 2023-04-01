import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { useCallback, useEffect, useState } from 'react'

import { authSelectors, modalSelectors, useGoods } from '#/entities'
import { cartSelectors } from '#/entities/cart'
import { Accordion, DescriptionSkeleton, ListSkeleton, SizeList } from '#/shared/ui'
import { ColorsList } from '#/shared/ui/colors-list'

export const SingleGoodInfo = () => {
  const good = useGoods(state => state.good)
  const [clothesSize, setClothesSize] = useState('')
  const [clothesColor, setClothesColor] = useState('')
  const user = authSelectors.use.user()
  const toggleAuth = modalSelectors.use.toggleAuth()
  const toggleCart = modalSelectors.use.toggleCart()
  const addToCart = cartSelectors.use.addCartGoods()
  const router = useRouter()
  const { t } = useTranslation()

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
          <p className='mb-2'>{t('SIZE')}</p>
          {good ? <SizeList good={good} clothesSize={clothesSize} setClothesSize={setClothesSize} /> : <ListSkeleton />}
        </div>
        <div className='mb-4 font-medium'>
          <p className='mb-2'>{t('COLOR')}</p>
          {good ? (
            <ColorsList clothesColor={clothesColor} good={good} setClothesColor={setClothesColor} />
          ) : (
            <ListSkeleton />
          )}
        </div>
        {good ? <div className='mb-6'>{good.description}</div> : <DescriptionSkeleton />}
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
                id: good.id,
                cartId: Math.random(),
                quantity: 1
              })
            } else {
              toggleAuth(true)
            }
          }}
        >
          {t('Add to cart')}
        </button>
        <Accordion
          sections={[
            { title: t('Care'), content: good?.care || '' },
            { title: t('Details'), content: good?.details || '' }
          ]}
        />
      </div>
    </>
  )
}
