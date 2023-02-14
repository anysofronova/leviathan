'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { v4 } from 'uuid'

import { productsStateSelector } from '#/entities'
import { useAppSelector } from '#/shared/hooks'
import { LinkSelect } from '#/shared/ui/link-select'

export const ProductsDesigners = () => {
  const mockItems = useAppSelector(productsStateSelector)
  const path = usePathname()
  const designers = mockItems.map(el => el.designer).filter((value, index, array) => array.indexOf(value) === index)
  const allDesignersUrl = path?.includes('clothes') ? 'clothes' : path?.includes('featured') ? 'featured' : ''
  const selected = designers.find(el => path?.includes(el.toLowerCase())) || 'All products'
  function createPath(designer: string) {
    let href = `${
      path?.includes('/designers') ? path.replace(/designers.*/, allDesignersUrl) : path
    }/designers/${designer.toLowerCase()}`

    if (href.includes('/clothes')) {
      href = `${href.replace('/clothes', '')}/clothes`
    } else if (href.includes('/featured')) {
      href = `${href.replace('/featured', '')}/featured`
    }
    return href
  }

  return (
    <>
      <div className='mr-8 hidden min-w-[150px] flex-col space-y-4 lg:flex'>
        <Link href={`/search/${allDesignersUrl}`} className='text-md cursor-pointer font-bold'>
          All designers
        </Link>
        {designers.map(designer => {
          return (
            <Link
              key={v4()}
              href={createPath(designer)}
              className={`cursor-pointer text-sm text-gray-500 ${
                path?.includes(designer.toLowerCase()) && 'underline'
              }`}
            >
              {designer}
            </Link>
          )
        })}
      </div>
      <div className='relative left-0 z-50 mb-4 lg:hidden'>
        <LinkSelect selected={selected}>
          <Link
            key={v4()}
            href={`/search/${allDesignersUrl}`}
            className='block p-3 text-sm text-gray-500 transition-all hover:bg-gray-100 hover:text-black hover:underline'
          >
            All designers
          </Link>
          {designers.map(option => {
            return (
              <Link
                key={v4()}
                href={createPath(option)}
                className='block p-3 text-sm text-gray-500 transition-all hover:bg-gray-100 hover:text-black hover:underline'
              >
                {option}
              </Link>
            )
          })}
        </LinkSelect>
      </div>
    </>
  )
}
