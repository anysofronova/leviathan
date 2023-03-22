import Head from 'next/head'
import { GetStaticProps } from 'next/types'
import { v4 } from 'uuid'

import { filtersService, productsService } from '#/shared/api/services'
import { Good, IDesigner, IFilters } from '#/shared/types'
import { PageWrapper, Product } from '#/shared/ui'

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
  return (
    <>
      <Head>
        <title>All products</title>
      </Head>
      <PageWrapper filters={filters} designers={designers}>
        {goods.map(({ name, productImage, price, id }) => {
          return <Product key={v4()} id={id} name={name} img={productImage} price={price} />
        })}
      </PageWrapper>
    </>
  )
}

export default Page
