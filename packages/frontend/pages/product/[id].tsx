import Head from 'next/head'
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
    <>
      <Head>
        <title>{good.name}</title>
      </Head>
      <div>
        <div className='mb-10 flex flex-col pb-10 lg:flex-row'>
          <ProductsSlider good={good} />
          <SingleProductInfo good={good} />
        </div>
        {/*<RelatedProducts good={good} />*/}
      </div>
    </>
  )
}

export default Page
