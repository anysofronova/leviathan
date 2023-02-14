import React, { FC, ReactNode } from 'react'

import { Categories, ProductsDesigners, ProductsFilter } from '#/features/product-sorting'

interface IProps {
  children: ReactNode
}

export const PageWrapper: FC<IProps> = ({ children }) => {
  return (
    <div className='mx-auto flex min-h-[92vh] w-full max-w-7xl flex-col py-2 px-3 md:px-6 lg:flex-row lg:justify-between lg:p-10'>
      <div className='order-1 flex flex-col lg:space-y-12'>
        <Categories />
        <ProductsDesigners />
      </div>
      <div className='order-3 grid w-full auto-rows-min gap-4 sm:grid-cols-1 md:grid-cols-2 lg:order-2 lg:grid-cols-3'>
        {children}
      </div>
      <div className='order-2 lg:order-3'>
        <ProductsFilter />
      </div>
    </div>
  )
}
