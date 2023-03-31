import Image from 'next/image'
import Link from 'next/link'

import { Good } from '#/shared/types'

interface IProps {
  relatedGoods: Good[]
}
export const RelatedGoods = ({ relatedGoods }: IProps) => {
  return (
    <div className='mb-6'>
      <h2 className='mx-3 mb-3 text-xl font-bold text-black dark:text-white'>Related products</h2>
      <div className='flex flex-wrap'>
        {relatedGoods?.map(good => {
          return (
            <Link
              key={good.id}
              href={`/product/${good.id}`}
              className='m-3 block w-full border bg-gray-100 dark:border-gray-600 dark:bg-black md:w-[47%] lg:w-[20%] xl:w-[23%]'
            >
              <Image src={good.productImage} width={1000} height={1000} alt='img' className='w-full' />
            </Link>
          )
        })}
      </div>
    </div>
  )
}
