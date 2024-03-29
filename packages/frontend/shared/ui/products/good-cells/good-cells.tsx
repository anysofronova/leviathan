import Link from 'next/link'

import { useGoods } from '#/entities'

export const GoodCells = () => {
  const goods = useGoods(state => state.goods)
  return (
    <div className='grid w-full lg:grid-flow-col lg:grid-cols-[2fr_1fr] lg:grid-rows-2'>
      {goods.slice(0, 3).map(({ name, price, productImage, id }, i) => {
        if (i === 0) {
          return (
            <Link
              key={id}
              href={`/product/${id}`}
              className='relative row-span-2 block flex w-full items-center justify-center overflow-hidden bg-[#7928CA] lg:w-full'
            >
              <div className='absolute top-0 left-0 z-[1] cursor-pointer'>
                <div className='border-b bg-white p-2 text-4xl font-bold text-black'>{name}</div>
                <div className='w-max bg-white py-2 px-3 text-xl text-black'>{price}$</div>
              </div>
              <div className='relative z-0 w-full transition-all duration-500 hover:scale-105'>
                <img src={productImage} width='100%' alt='img' />
              </div>
            </Link>
          )
        }
        return (
          <Link
            key={id}
            href={`/product/${id}`}
            className={`relative flex items-center justify-center overflow-hidden ${i === 1 && 'bg-black'}`}
          >
            <div className='absolute top-0 left-0 z-[1] cursor-pointer'>
              <div className='border-b bg-white p-2 text-4xl font-bold text-black'>{name}</div>
              <div className='w-max bg-white py-2 px-3 text-xl text-black'>{price}$</div>
            </div>
            <div className='relative z-0 w-full transition-all duration-500 hover:scale-105'>
              <img src={productImage} width='100%' alt='img' />
            </div>
          </Link>
        )
      })}
    </div>
  )
}
