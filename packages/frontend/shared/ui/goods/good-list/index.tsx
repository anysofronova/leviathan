import { goodsSelectors } from '#/entities'
import { Good } from '#/shared/ui'

export const GoodsList = () => {
  const goods = goodsSelectors.use.goods()

  if (goods.length === 0) {
    return <h2 className='text-lg font-medium text-black dark:text-white'>there are no goods.</h2>
  }
  return (
    <>
      {goods?.map(({ name, productImage, price, id }) => {
        return <Good key={id} id={id} name={name} img={productImage} price={price} />
      })}
    </>
  )
}
