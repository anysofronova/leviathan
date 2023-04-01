import Image from 'next/image'
import Link from 'next/link'

import { goodsSelectors } from '#/entities'

export const GoodBanner = () => {
  const goods = goodsSelectors.use.goods()
  return (
    <div className='relative flex overflow-x-hidden bg-black'>
      <div className='flex h-[300px] animate-bannerAnim whitespace-nowrap text-black'>
        {goods.map(({ productImage, name, id }) => {
          return (
            <div key={id} className='relative mr-auto flex h-full min-w-[400px] items-center md:min-w-[500px]'>
              <div className='w-[75%] md:w-[60%]'>
                <Image src={productImage} width={1000} height={1000} className='h-full w-full' alt='img' />
              </div>
              <Link
                href={`/good/${id}`}
                className='absolute right-1/2 translate-x-1/2 bg-white py-2 px-10 text-2xl font-bold'
              >
                {name}
              </Link>
            </div>
          )
        })}
      </div>

      <div className='absolute top-0 flex h-[300px] animate-bannerAnim2 whitespace-nowrap text-black'>
        {goods.map(({ productImage, name, id }) => {
          return (
            <div key={id} className='relative mr-auto flex h-full min-w-[400px] items-center md:min-w-[500px]'>
              <div className='w-[75%] md:w-[60%]'>
                <Image src={productImage} width={1000} height={1000} className='h-full w-full' alt='img' />
              </div>
              <Link
                href={`/good/${id}`}
                className='absolute right-1/2 translate-x-1/2 bg-white py-2 px-10 text-2xl font-bold'
              >
                {name}
              </Link>
            </div>
          )
        })}
      </div>
    </div>
  )
}
