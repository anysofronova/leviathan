import { useTranslation } from 'next-i18next'

import { goodsSelectors } from '#/entities'
import { LinkSelect } from '#/shared/ui/link-select'

interface IProps {
  queries: string[]
  sort: string
  type: string
}

export const ProductsSorting = ({ queries, sort, type }: IProps) => {
  const goodsQueries = goodsSelectors.use.queries()
  const getQueryGoods = goodsSelectors.use.getQueryGoods()
  const { t } = useTranslation()

  const handleSort = (value: string) => {
    getQueryGoods({ [type]: encodeURIComponent(value) })
  }

  const renderButton = (value: string) => (
    <button
      key={value}
      className={`text-left text-sm text-gray-500 transition-all hover:text-black dark:hover:text-white ${
        goodsQueries[type] === value ? 'underline' : ''
      }`}
      onClick={() => handleSort(value)}
    >
      {value}
    </button>
  )

  const renderMobileButton = (value: string) => (
    <button
      key={value}
      className={`block w-full p-3 text-left text-sm text-gray-500 transition-all hover:bg-gray-100 hover:text-black hover:underline  dark:bg-gray-1000 dark:text-white ${
        goodsQueries[type] === value ? 'bg-gray-200 dark:border-gray-600' : 'dark:bg-black'
      }`}
      onClick={() => handleSort(value)}
    >
      {value}
    </button>
  )

  return (
    <>
      <div className='mr-8 hidden min-w-[150px] flex-col space-y-4 lg:flex'>
        <button className='text-md text-left font-bold' onClick={() => handleSort('')}>
          {t(sort)}
        </button>
        {queries.map(renderButton)}
      </div>
      <div className='mb-2 lg:hidden'>
        <LinkSelect selected={t(sort)} type={type}>
          {queries.map(renderMobileButton)}
        </LinkSelect>
      </div>
    </>
  )
}
