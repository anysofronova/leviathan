import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export const HeaderLogo = () => {
  const path = usePathname()
  return (
    <Link href={path?.split('/')[1] || '/'}>
      <Image
        src={'/static/leviathan-logo.png'}
        height={32}
        width={32}
        alt='img'
        className='mr-6 rounded-full dark:bg-white'
      />
    </Link>
  )
}
