'use client'

import { v4 } from 'uuid'

import { productsStateSelector } from '#/entities'
import { useAppSelector } from '#/shared/hooks'
import { Product } from '#/shared/ui'
import { PageWrapper } from '#/widgets'

const Page = () => {
  const mockItems = useAppSelector(productsStateSelector)

  return (
    <PageWrapper>
      {mockItems.map(el => {
        if (el.clothes) {
          return <Product key={v4()} name={el.name} img={el.img} price={el.price} />
        }
        return null
      })}
    </PageWrapper>
  )
}

export default Page