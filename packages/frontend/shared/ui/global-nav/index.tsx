import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTranslations } from 'next-intl'

export const GlobalNav = () => {
  const path = usePathname()
  const t = useTranslations()
  return (
    <nav className='mr-6 flex w-[210px] justify-between text-gray-500 dark:text-white'>
      <Link href={`${path?.split('/')[1]}/all-products`}>{t('All products')}</Link>
    </nav>
  )
}
