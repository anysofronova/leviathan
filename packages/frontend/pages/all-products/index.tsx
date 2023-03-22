import { GetStaticProps } from 'next/types'
import { v4 } from 'uuid'

import { filtersService, productsService } from '#/shared/api/services'
import { Good, IDesigner, IFilters } from '#/shared/types'
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
interface IProps {
  goods: Good[]
  filters: IFilters
  designers: IDesigner[]
}

const Page = ({ goods, filters, designers }: IProps) => {
  console.log(filters, designers)
  return (
    <PageWrapper>
      <button onClick={() => filtersService.getFilters().then(console.log)}>click</button>
      <button onClick={() => filtersService.getDesigners().then(console.log)}>click2</button>
      {goods.map(({ name, productImage, price, id }) => {
        return <Product key={v4()} id={id} name={name} img={productImage} price={price} />
      })}
    </PageWrapper>
  )
}

export default Page
