import Link from 'next/link'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

export const GlobalNav = () => {
  const { t } = useTranslation()
  const { pathname } = useRouter()
  return (
    <nav
      className={`mr-6 flex w-[210px] justify-between font-medium transition-all hover:text-black dark:hover:text-white ${
        pathname === '/all-products' ? 'text-black dark:text-white' : 'text-gray-500 dark:text-gray-400'
      }`}
    >
      <Link href={`/all-products`}>{t('All products')}</Link>
    </nav>
  )
}
