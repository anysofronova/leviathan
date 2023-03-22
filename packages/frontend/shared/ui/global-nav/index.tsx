import Link from 'next/link'
import { useTranslation } from 'next-i18next'

export const GlobalNav = () => {
  const { t } = useTranslation()
  return (
    <nav className='mr-6 flex w-[210px] justify-between font-medium text-gray-500 transition-all hover:text-black dark:text-gray-400 dark:hover:text-white'>
      <Link href={`/all-products`}>{t('All products')}</Link>
    </nav>
  )
}
