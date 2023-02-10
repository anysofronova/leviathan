import Link from 'next/link'

export const GlobalNav = () => (
  <nav className='mr-6 flex w-[210px] justify-between text-gray-500'>
    <Link href={'/search'}>All</Link>
    <Link href={'/search/clothes'}>New Arrivals</Link>
    <Link href={'/search/featured'}>Featured</Link>
  </nav>
)
