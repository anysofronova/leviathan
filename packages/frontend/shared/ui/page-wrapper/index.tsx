import { FC, ReactNode } from 'react'

import { IDesigner, IFilters } from '#/shared/types'
import { ProductsSorting } from '#/shared/ui'

interface IProps {
  children: ReactNode
  designers: IDesigner[]
  filters: IFilters
}

export const PageWrapper: FC<IProps> = ({ children, designers, filters }) => {
  return (
    <div className='mx-auto flex min-h-[92vh] w-full max-w-7xl flex-col py-2 px-3 text-black dark:bg-black dark:text-white md:px-6 lg:flex-row lg:justify-between lg:p-10'>
      <div className='order-1 flex flex-col lg:space-y-12'>
        <ProductsSorting sort='All categories' queries={filters.categories} />
        <ProductsSorting sort='All designers' queries={designers.map(({ name }) => name)} />
      </div>
      <div className='order-3 grid w-full auto-rows-min gap-4 sm:grid-cols-1 md:grid-cols-2 lg:order-2 lg:grid-cols-3'>
        {children}
      </div>
      <div className='order-2 mb-4 ml-0 lg:order-3 lg:mb-0 lg:ml-8'>
        <ProductsSorting sort='Relevance' queries={filters.relevance} />
      </div>
    </div>
  )
}
