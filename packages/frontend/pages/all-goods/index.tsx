import Head from 'next/head'
import { GetStaticProps } from 'next/types'
import { useEffect } from 'react'

import { useGoods } from '#/entities'
import { filtersService, goodsService } from '#/shared/api/services'
import { Good, IDesigner, IFilters } from '#/shared/types'
import { GoodsList, PageWrapper } from '#/shared/ui'

export const getStaticProps: GetStaticProps = async () => {
  const goods = await goodsService.getGoods()
  const filters = await filtersService.getFilters()
  const designers = await filtersService.getDesigners()

  return {
    props: {
      goods,
      filters,
      designers
    },
    revalidate: 10
  }
}
interface IProps {
  goods: Good[]
  filters: IFilters
  designers: IDesigner[]
}

const AllGoodsPage = ({ goods, filters, designers }: IProps) => {
  useEffect(() => {
    if (goods) {
      useGoods.setState({ goods })
    }
  }, [])

  return (
    <>
      <Head>
        <title>All goods</title>
      </Head>
      <PageWrapper filters={filters} designers={designers}>
        <GoodsList />
      </PageWrapper>
    </>
  )
}

export default AllGoodsPage
