'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { v4 } from 'uuid'

import { LinkSelect } from '#/shared/ui/link-select'

export const Categories = () => {
  const path = usePathname()
  const options = [
    { route: '/search', name: 'All categories' },
    { route: '/search/clothes', name: 'New Arrivals' },
    { route: '/search/featured', name: 'Featured' }
  ]
  const selected = path?.includes('clothes')
    ? 'New Arrivals'
    : path?.includes('featured')
    ? 'Featured'
    : 'All categories'

  function createPath(name: string) {
    if (path) {
      let href = path?.includes(name) && name !== 'search' ? path?.replace(name, '') : path

      if (name !== 'search') {
        href = href?.includes('/designers') ? `${href}/${name}` : `/search/${name}`
      }

      if (name === 'clothes') {
        href = href?.includes('/featured') ? href.replace('/featured', '') : href
      } else if (name === 'featured') {
        href = href?.includes('/clothes') ? href.replace('/clothes', '') : href
      } else {
        const notNeededRoute = href?.includes('/clothes') ? '/clothes' : href?.includes('/featured') ? '/featured' : ''
        href = href?.replace(notNeededRoute, '')
      }
      return href
    }
    return '/search'
  }
  return (
    <>
      <div className='mr-8 hidden min-w-[150px] flex-col space-y-4 lg:flex'>
        <Link href={createPath('search')} className='text-md font-bold'>
          All categories
        </Link>
        <Link
          href={createPath('clothes')}
          className={`text-sm text-gray-500 ${path?.includes('clothes') && 'underline'}`}
        >
          New Arrivals
        </Link>
        <Link
          href={createPath('featured')}
          className={`text-sm text-gray-500 ${path?.includes('featured') && 'underline'}`}
        >
          Featured
        </Link>
      </div>
      <div className='relative left-0 z-[60] mb-4 lg:hidden'>
        <LinkSelect selected={selected}>
          {options.map(el => {
            return (
              <Link
                key={v4()}
                href={el.route}
                className='block p-3 text-sm text-gray-500 transition-all hover:bg-gray-100 hover:text-black hover:underline'
              >
                {el.name}
              </Link>
            )
          })}
        </LinkSelect>
      </div>
    </>
  )
}
