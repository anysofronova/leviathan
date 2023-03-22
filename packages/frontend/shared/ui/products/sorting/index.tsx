import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { FC } from 'react'
import { v4 } from 'uuid'

import { LinkSelect } from '#/shared/ui/link-select'

interface IProps {
  queries: string[]
  sort: string
}

export const ProductsSorting: FC<IProps> = ({ queries, sort }) => {
  const params = useSearchParams()
  const selected = params.get('sort')
  return (
    <>
      <div className='mr-8 hidden min-w-[150px] flex-col space-y-4 lg:flex'>
        <Link key={v4()} href={{ pathname: '/all-products' }} className='text-md font-bold'>
          {sort}
        </Link>
        {queries.map(el => {
          return (
            <Link
              key={v4()}
              href={{ pathname: '/all-products', query: { sort: el.toLowerCase().replace(/[:\s]/g, '-') } }}
              className={`text-sm text-gray-500 transition-all hover:text-black dark:hover:text-white ${
                selected === el.toLowerCase().replace(/[:\s]/g, '-') ? 'underline' : ''
              }`}
            >
              {el}
            </Link>
          )
        })}
      </div>
      <div className='mb-2 lg:hidden'>
        <LinkSelect selected={sort}>
          {queries.map(el => {
            return (
              <Link
                key={v4()}
                href={{
                  pathname: '/all-products',
                  query: { sort: el.toLowerCase().replace(/[:\s]/g, '-') }
                }}
                className={`block p-3 text-sm text-gray-500 transition-all hover:bg-gray-100 hover:text-black hover:underline  dark:bg-gray-1000 dark:text-white ${
                  selected === el.toLowerCase().replace(/[:\s]/g, '-')
                    ? 'bg-gray-200 dark:border-gray-600'
                    : 'dark:bg-black'
                }`}
              >
                {el}
              </Link>
            )
          })}
        </LinkSelect>
      </div>
    </>
  )
}
