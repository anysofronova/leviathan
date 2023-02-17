'use client'

import React, { FC, useEffect } from 'react'

import { getOneProduct, productStateSelector } from '#/entities'
import { useAppDispatch, useAppSelector } from '#/shared/hooks'

interface IPageParams {
  params: { slug: string }
}
const Page: FC<IPageParams> = ({ params }) => {
  const product = useAppSelector(productStateSelector)
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(getOneProduct({ name: params.slug }))
  })
  return <div>{product?.name}</div>
}

export default Page
