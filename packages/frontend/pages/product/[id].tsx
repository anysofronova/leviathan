import { productsService } from '#/shared/api/services'
import { RelatedProducts } from '#/shared/ui'
import { ProductsSlider, SingleProductInfo } from '#/widgets'

interface IPageParams {
  params: { slug: string }
}
export async function getStaticPaths() {
  const products = await productsService.getProducts()
  const paths = products.map(({ id }) => ({
    params: { id: id.toString() }
  }))
  return { paths, fallback: false }
}
const Page = ({ params }: IPageParams) => {
  console.log(params)
  return (
    <div>
      <div className='mb-10 flex flex-col border-b pb-10 lg:flex-row'>
        <ProductsSlider />
        <SingleProductInfo />
      </div>
      <RelatedProducts />
    </div>
  )
}

export default Page
