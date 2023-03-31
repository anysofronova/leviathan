import Head from 'next/head'
import { GetStaticProps } from 'next/types'
import { useEffect } from 'react'

import { goodsSelectors, useGoods } from '#/entities'
import { productsService } from '#/shared/api/services'
import { Good } from '#/shared/types'
import { RelatedGoods } from '#/shared/ui'
import { GoodsSlider, SingleGoodInfo } from '#/widgets'

export async function getStaticPaths() {
  const goods = await productsService.getGoods()
  const paths = goods.map(({ id }) => ({
    params: { id: id.toString() }
  }))
  return { paths, fallback: 'blocking' }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const good = await productsService.getOneGood(params?.id as string)

  return {
    props: {
      good
    },
    revalidate: 60 // Revalidate the page every 60 seconds
  }
}

type Props = { good: Good }

const SingleGoodPage = ({ good }: Props) => {
  const goods = goodsSelectors.use.goods()
  const relatedGoods = goods.filter(el => el.id !== good.id).slice(0, 4)

  useEffect(() => {
    useGoods.setState({ good })
  }, [good])

  useEffect(() => {
    const fetchGoods = async () => {
      const goods = await productsService.getGoods()
      if (goods) {
        useGoods.setState({ goods })
      }
    }
    fetchGoods()
  }, [])

  return (
    <>
      <Head>
        <title>{good.name}</title>
      </Head>
      <div>
        <div className='mb-10 flex flex-col pb-10 lg:flex-row'>
          <GoodsSlider />
          <SingleGoodInfo />
        </div>
        <RelatedGoods relatedGoods={relatedGoods} />
      </div>
    </>
  )
}

export default SingleGoodPage
