import { GetStaticProps } from 'next/types'
import { useEffect } from 'react'

// import { useProducts } from '#/entities'
import { productsService } from '#/shared/api/services'
import { Good } from '#/shared/types'
import { ProductCells } from '#/shared/ui'
import { ProductBanner } from '#/shared/ui/products/product-banner'

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      goods: await productsService.getGoods()
    },
    revalidate: 10
  }
}
type ApplicationStaticInferProps = { goods: Good[] }
const Application = ({ goods }: ApplicationStaticInferProps) => {
  // useProducts.setState({ goods })

  useEffect(() => {
    productsService.getGoods().then(console.log)
  }, [])

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