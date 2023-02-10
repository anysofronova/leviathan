'use client'

import { PageInfo, ProductCells } from '#/shared/ui'
import { ProductBanner } from '#/shared/ui/products/product-banner'

const Application = () => {
  const mockItems = [
    { id: 1, img: '/static/hoodie.png', name: 'hoodie1', price: 39.99 },
    { id: 2, img: '/static/hoodie2.png', name: 'hoodie2', price: 20 },
    { id: 3, img: '/static/hoodie3.png', name: 'hoodie3', price: 13.99 },
    { id: 4, img: '/static/hoodie4.png', name: 'hoodie4', price: 13 },
    { id: 5, img: '/static/hoodie4.png', name: 'hoodie5', price: 13 },
    { id: 6, img: '/static/hoodie4.png', name: 'hoodie6', price: 13 }
  ]

  return (
    <>
      <div className='mb-1 flex flex-col bg-green-400 lg:flex-row'>
        <ProductCells mockItems={mockItems} />
      </div>
      <ProductBanner mockItems={mockItems} />
      <PageInfo />
    </>
  )
}

export default Application
