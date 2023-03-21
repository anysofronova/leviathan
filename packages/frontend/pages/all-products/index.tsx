import { GetStaticProps } from 'next/types'
import { v4 } from 'uuid'

import { productsService } from '#/shared/api/services'
import { Good } from '#/shared/types'
import { PageWrapper, Product } from '#/shared/ui'

export const getStaticProps: GetStaticProps = async () => {
  const goods = await productsService.getGoods()
  return {
    props: {
      goods
    },
    revalidate: 10
  }
}
type Props = { goods: Good[] }

const Page = ({ goods }: Props) => {
  return (
    <PageWrapper>
      {goods.map(({ name, productImage, price, id }) => {
        return <Product key={v4()} id={id} name={name} img={productImage} price={price} />
      })}
    </PageWrapper>
  )
}

export default Page
