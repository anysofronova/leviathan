'use client'
import { v4 } from 'uuid'

import { productsStateSelector } from '#/entities'
import { useAppSelector } from '#/shared/hooks'
import { PageWrapper, Product } from '#/shared/ui'

const Page = () => {
  const mockItems = useAppSelector(productsStateSelector)
  return (
    <PageWrapper>
      {mockItems.map(el => {
        return <Product key={v4()} name={el.name} img={el.img} price={el.price} />
      })}
    </PageWrapper>
  )
}

export default Page
