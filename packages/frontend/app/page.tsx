'use client'

import { productsStateSelector } from '#/entities'
import { useAppSelector } from '#/shared/hooks'
import { ProductCells } from '#/shared/ui'
import { ProductBanner } from '#/shared/ui/products/product-banner'

const Application = () => {
  const mockItems = useAppSelector(productsStateSelector)

  return (
    <>
      <div className='flex flex-col bg-[#FF0080] lg:flex-row'>
        <ProductCells mockItems={mockItems} />
      </div>
      <ProductBanner mockItems={mockItems} />
    </>
  )
}

export default Application
