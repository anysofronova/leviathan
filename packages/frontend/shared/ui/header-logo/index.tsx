import Image from 'next/image'
import Link from 'next/link'

export const HeaderLogo = () => (
  <Link href={'/'}>
    <Image src={'/static/leviathan-logo.png'} height={32} width={32} alt='img' className='mr-6' />
  </Link>
)
