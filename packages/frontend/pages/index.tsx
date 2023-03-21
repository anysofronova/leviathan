import { GetStaticProps } from 'next/types'

import { productsService } from '#/shared/api/services'
import { Good } from '#/shared/types'
import { ProductCells } from '#/shared/ui'
import { ProductBanner } from '#/shared/ui/products/product-banner'

export const getStaticProps: GetStaticProps = async () => {
  const goods = await productsService.getProducts()
  return {
    props: {
      goods
    },
    revalidate: 10
  }
}
type ApplicationStaticInferProps = { goods: Good[] }
const Application = ({ goods }: ApplicationStaticInferProps) => {
  return (
    <>
      <div className='flex flex-col bg-[#FF0080] lg:flex-row'>
        <ProductCells goods={goods} />
      </div>
      <ProductBanner goods={goods} />
    </>
  )
}

export default Application
