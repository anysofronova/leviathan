import Link from 'next/link'

export const GlobalNav = () => (
  <nav className='mr-6 flex w-[210px] justify-between text-gray-500 dark:text-white'>
    <Link href={'/all-products'}>All products</Link>
  </nav>
)
