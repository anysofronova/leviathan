import Head from 'next/head'
import { GetStaticProps } from 'next/types'
import { useEffect } from 'react'

import { useGoods } from '#/entities'
import { filtersService, productsService } from '#/shared/api/services'
import { Good, IDesigner, IFilters } from '#/shared/types'
import { GoodsList, PageWrapper } from '#/shared/ui'

export const getStaticProps: GetStaticProps = async () => {
  const goods = await productsService.getGoods()
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

const Page = ({ goods, filters, designers }: IProps) => {
  useEffect(() => {
    if (goods) {
      useGoods.setState({ goods })
    }
  }, [])
  return (
    <>
      <Head>
        <title>All products</title>
      </Head>
      <PageWrapper filters={filters} designers={designers}>
        <GoodsList />
      </PageWrapper>
    </>
  )
}

export default Page
