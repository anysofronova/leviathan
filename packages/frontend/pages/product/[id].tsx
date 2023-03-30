import Head from 'next/head'
import { GetStaticProps } from 'next/types'
import { useEffect } from 'react'

import { useGoods } from '#/entities'
import { productsService } from '#/shared/api/services'
import { Good } from '#/shared/types'
import { RelatedProducts } from '#/shared/ui'
import { ProductsSlider, SingleProductInfo } from '#/widgets'

export async function getStaticPaths() {
  const goods = await productsService.getGoods()
  const paths = goods.map(({ id }) => ({
    params: { id: id.toString() }
  }))
  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const good = await productsService.getOneGood(params?.id as string)
  const goods = await productsService.getGoods()

  return {
    props: {
      good,
      goods
    }
  }
}
type Props = { good: Good; goods: Good[] }
const SingleGoodPage = ({ good, goods }: Props) => {
  const relatedGoods = goods.filter(el => el.id !== good.id).slice(0, 4)
  useEffect(() => {
    if (goods && good) {
      useGoods.setState({ goods })
      useGoods.setState({ good })
    }
  }, [good, goods])
  return (
    <>
      <Head>
        <title>{good.name}</title>
      </Head>
      <div>
        <div className='mb-10 flex flex-col pb-10 lg:flex-row'>
          <ProductsSlider />
          <SingleProductInfo />
        </div>
        <RelatedProducts relatedGoods={relatedGoods} />
      </div>
    </>
  )
}

export default SingleGoodPage
