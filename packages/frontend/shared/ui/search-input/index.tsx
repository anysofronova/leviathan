'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { IoMdSearch } from 'react-icons/io'

export const SearchInput = () => {
  const [inputValue, setInputValue] = useState('')
  const t = useTranslations()

  return (
    <div className='relative col-span-2 row-start-2 flex w-full min-w-[260px] lg:col-auto lg:row-start-auto lg:block lg:max-w-[620px]'>
      <input
        placeholder={t('Search')}
        className=' relative inline-flex w-full border border-gray-200 bg-gray-50 p-3 leading-none text-gray-700 text-black placeholder-gray-500 outline-none focus:border-gray-300 focus:ring-0 focus:ring-gray-300 dark:border-gray-600 dark:bg-black dark:text-white'
        value={inputValue}
        onChange={e => setInputValue(e.target.value)}
      />
      <Link
        href={{ pathname: '/all-products', query: inputValue && { search: inputValue } }}
        type='button'
        className='absolute right-3 top-3 text-black dark:text-white'
      >
        <IoMdSearch size={22} />
      </Link>
    </div>
  )
}
