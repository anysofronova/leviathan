import Link from 'next/link'
import { usePathname } from 'next/navigation'

export const GlobalNav = () => {
  const path = usePathname()
  return (
    <nav className='mr-6 flex w-[210px] justify-between text-gray-500 dark:text-white'>
      <Link href={`${path?.split('/')[1]}/all-products`}>{'All products'}</Link>
    </nav>
  )
}
