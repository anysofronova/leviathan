'use client'

import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { FC } from 'react'
import { v4 } from 'uuid'

import { LinkSelect } from '#/shared/ui/link-select'

interface IProps {
  queries: { name: string }[]
  sort: string
}

export const ProductsSorting: FC<IProps> = ({ queries, sort }) => {
  const params = useSearchParams()
  const selected = params.get('sort')
  const path = usePathname()
  return (
    <>
      <div className='mr-8 hidden min-w-[150px] flex-col space-y-4 lg:flex'>
        <Link key={v4()} href={{ pathname: `${path?.split('/')[1]}/all-products` }} className='text-md font-bold'>
          {sort}
        </Link>
        {queries.map(({ name }) => {
          return (
            <Link
              key={v4()}
              href={{ pathname: '/all-products', query: { sort: name.toLowerCase().replace(/[:\s]/g, '-') } }}
              className={`text-sm text-gray-500 dark:text-white ${
                selected === name.toLowerCase().replace(/[:\s]/g, '-') ? 'underline' : ''
              }`}
            >
              {name}
            </Link>
          )
        })}
      </div>
      <div className='mb-2 lg:hidden'>
        <LinkSelect selected={sort}>
          {queries.map(({ name }) => {
            return (
              <Link
                key={v4()}
                href={{
                  pathname: `${path?.split('/')[1]}/all-products`,
                  query: { sort: name.toLowerCase().replace(/[:\s]/g, '-') }
                }}
                className={`block p-3 text-sm text-gray-500 transition-all hover:bg-gray-100 hover:text-black hover:underline dark:border-white dark:text-white ${
                  selected === name.toLowerCase().replace(/[:\s]/g, '-')
                    ? 'bg-gray-200 dark:bg-gray-1000'
                    : 'dark:bg-black'
                }`}
              >
                {name}
              </Link>
            )
          })}
        </LinkSelect>
      </div>
    </>
  )
}
