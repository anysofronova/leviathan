import Link from 'next/link'
import { v4 } from 'uuid'

export const RelatedProducts = () => {
  const product: any = []
  return (
    <div>
      <h2 className='mx-3 mb-3 text-xl font-bold text-black dark:text-white'>Related products</h2>
      <div className='flex flex-wrap'>
        {product?.children.map((el: any) => {
          return (
            <Link
              key={v4()}
              href={`/product/${el.name}`}
              className='m-3 block w-full border bg-gray-100 dark:bg-black md:w-1/4'
            >
              <img src={el.img} alt='img' className='w-full' />
            </Link>
          )
        })}
      </div>
    </div>
  )
}
