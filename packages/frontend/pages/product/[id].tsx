import { GetStaticProps } from 'next/types'

import { productsService } from '#/shared/api/services'
import { Good } from '#/shared/types'
import { ProductsSlider, SingleProductInfo } from '#/widgets'

// import { RelatedProducts } from '#/shared/ui'

export async function getStaticPaths() {
  const products = await productsService.getGoods()
  const paths = products.map(({ id }) => ({
    params: { id: id.toString() }
  }))
  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const good = await productsService.getOneGood(params?.id as string)
  return {
    props: {
      good
    }
  }
}
type Props = { good: Good }
const Page = ({ good }: Props) => {
  return (
    <div>
      <div className='mb-10 flex flex-col border-b pb-10 lg:flex-row'>
        <ProductsSlider good={good} />
        <SingleProductInfo good={good} />
      </div>
      {/*<RelatedProducts good={good} />*/}
    </div>
  )
}

export default Page