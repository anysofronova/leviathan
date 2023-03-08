import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTranslations } from 'next-intl'

export const GlobalNav = () => {
  const path = usePathname()
  const t = useTranslations()
  return (
    <nav className='mr-6 flex w-[210px] justify-between font-medium text-gray-500 transition-all hover:text-black dark:text-gray-400 dark:hover:text-white'>
      <Link href={`${path?.split('/')[1]}/all-products`}>{t('All products')}</Link>
    </nav>
  )
}
