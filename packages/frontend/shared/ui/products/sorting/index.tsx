import { useTranslation } from 'next-i18next'
import { FC } from 'react'

import { goodsSelectors } from '#/entities'
import { LinkSelect } from '#/shared/ui/link-select'

interface IProps {
  queries: string[]
  sort: string
  type: string
}

export const ProductsSorting: FC<IProps> = ({ queries, sort, type }) => {
  const goodsQueries = goodsSelectors.use.queries()
  const getQueryGoods = goodsSelectors.use.getQueryGoods()
  const { t } = useTranslation()
  return (
    <>
      <div className='mr-8 hidden min-w-[150px] flex-col space-y-4 lg:flex'>
        <button className='text-md text-left font-bold' onClick={() => getQueryGoods({ [type]: '' })}>
          {t(sort)}
        </button>
        {queries.map(el => {
          return (
            <button
              key={el}
              className={`text-left text-sm text-gray-500 transition-all hover:text-black dark:hover:text-white ${
                goodsQueries[type] === el ? 'underline' : ''
              }`}
              onClick={() => getQueryGoods({ [type]: el })}
            >
              {el}
            </button>
          )
        })}
      </div>
      <div className='mb-2 lg:hidden'>
        <LinkSelect selected={t(sort)} type={type}>
          {queries.map(el => {
            return (
              <button
                key={el}
                className={`block w-full p-3 text-left text-sm text-gray-500 transition-all hover:bg-gray-100 hover:text-black hover:underline  dark:bg-gray-1000 dark:text-white ${
                  goodsQueries[type] === el ? 'bg-gray-200 dark:border-gray-600' : 'dark:bg-black'
                }`}
                onClick={() => getQueryGoods({ [type]: el })}
              >
                {el}
              </button>
            )
          })}
        </LinkSelect>
      </div>
    </>
  )
}
