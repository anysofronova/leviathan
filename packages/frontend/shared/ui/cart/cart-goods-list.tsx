import { cartSelectors } from '#/entities/cart'
import { CartGoodButtons } from '#/shared/ui'

export const CartGoodsList = () => {
  const cartGoods = cartSelectors.use.cartGoods()
  const removeCartGood = cartSelectors.use.removeCartGoods()
  const addOrRemove = cartSelectors.use.addOrRemoveOneCartGood()

  const handleRemoveCartGood = (id: number) => removeCartGood(id)

  const handleAddOrRemove = ({ cartId, add }: { cartId: number; add: boolean }) => addOrRemove({ cartId, add })

  return (
    <div className='flex flex-col'>
      {cartGoods.map(el => {
        return (
          <div key={el.id} className={`mb-2 pb-5 ${cartGoods.at(-1) === el ? '' : 'border-b'}`}>
            <div className='mb-2 flex items-center justify-between'>
              <div className='mr-3 w-[100px] bg-purple-700'>
                <img src={el.productImage} alt='img' className='w-full' />
              </div>
              <div className='w-full text-left text-sm font-medium'>
                <h3 className='mb-0.5 block'>{el.name}</h3>
                <div className='mb-0.5 flex items-center'>
                  <span>Size:</span>
                  <div className='mx-0.5 flex min-h-[22px] min-w-[22px] items-center justify-center rounded-full border border-gray-400 p-0.5 text-[11px] font-black'>
                    {el.size}
                  </div>
                </div>
                <div className='flex items-center'>
                  Color:
                  <div
                    className='mx-0.5 flex min-h-[22px] min-w-[22px] items-center justify-center rounded-full border border-gray-400 p-0.5'
                    style={{ backgroundColor: el.color }}
                  />
                </div>
              </div>
              <div>${el.price}</div>
            </div>
            <CartGoodButtons
              quantity={el.quantity}
              onRemove={() => handleRemoveCartGood(el.cartId)}
              onAddOrRemove={(add: boolean) => handleAddOrRemove({ cartId: el.cartId, add })}
            />
          </div>
        )
      })}
    </div>
  )
}
