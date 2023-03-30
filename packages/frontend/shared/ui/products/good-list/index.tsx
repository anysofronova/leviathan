import { useGoods } from '#/entities'
import { Product } from '#/shared/ui'

export const GoodsList = () => {
  const goods = useGoods(state => state.goods)
  return (
    <>
      {goods?.map(({ name, productImage, price, id }) => {
        return <Product key={id} id={id} name={name} img={productImage} price={price} />
      })}
    </>
  )
}
