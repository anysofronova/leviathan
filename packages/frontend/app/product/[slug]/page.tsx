'use client'

import { NextPage } from 'next'
import React, { useEffect } from 'react'

import { getOneProduct } from '#/entities'
import { useAppDispatch } from '#/shared/hooks'
import { RelatedProducts } from '#/shared/ui'
import { ProductsSlider, SingleProductInfo } from '#/widgets'

interface IPageParams {
  params: { slug: string }
}
const Page: NextPage<IPageParams> = ({ params }) => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(getOneProduct({ name: params.slug }))
  })
  return (
    <div>
      <div className='mb-10 flex flex-col border-b pb-10 lg:flex-row'>
        <ProductsSlider />
        <SingleProductInfo />
      </div>
      <RelatedProducts />
    </div>
  )
}

export default Page
