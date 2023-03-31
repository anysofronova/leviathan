import { useTranslation } from 'next-i18next'

import { goodsSelectors } from '#/entities'
import { LinkSelect } from '#/shared/ui/link-select'

import { SortingBtn } from './sortingBtn'

interface IProps {
  queries: string[]
  sort: string
  type: string
}

export const ProductsSorting = ({ queries, sort, type }: IProps) => {
  const goodsQueries = goodsSelectors.use.queries()
  const getQueryGoods = goodsSelectors.use.getQueryGoods()
  const { t } = useTranslation()

  const handleSort = (value: string) => getQueryGoods({ [type]: encodeURIComponent(value) })

  const getClassName = (isActive: boolean, mobile = false) => {
    const baseClassName = `text-left text-sm text-gray-500 transition-all hover:text-black dark:hover:text-white ${
      isActive ? 'underline' : ''
    }`
    return mobile
      ? `block w-full p-3 ${baseClassName} hover:bg-gray-100 hover:underline dark:bg-gray-1000 dark:text-white ${
          isActive ? 'bg-gray-200 dark:border-gray-600' : 'dark:bg-black'
        }`
      : baseClassName
  }

  return (
    <>
      <div className='mr-8 hidden min-w-[150px] flex-col space-y-4 lg:flex'>
        <button className='text-md text-left font-bold' onClick={() => handleSort('')}>
          {t(sort)}
        </button>
        {queries.map(value => {
          const isActive = goodsQueries[type] === encodeURIComponent(value)
          return <SortingBtn key={value} value={value} className={getClassName(isActive)} handleSort={handleSort} />
        })}
      </div>
      <div className='mb-2 lg:hidden'>
        <LinkSelect selected={t(sort)} type={type}>
          {queries.map(value => {
            const isActive = goodsQueries[type] === encodeURIComponent(value)
            return (
              <SortingBtn key={value} value={value} className={getClassName(isActive, true)} handleSort={handleSort} />
            )
          })}
        </LinkSelect>
      </div>
    </>
  )
}
