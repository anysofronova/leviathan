'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { AiFillGithub } from 'react-icons/ai'

import { FooterSelect } from '#/shared/ui'

export const Footer = () => {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])
  const handleTheme = (elem: string) => {
    setTheme(elem)
  }

  if (!mounted) {
    return null
  }

  return (
    <footer className='border-t bg-white p-5 text-black dark:bg-black dark:text-white'>
      <div className='mx-auto max-w-[1220px]'>
        <div className='flex flex-col justify-between border-b pb-8 sm:flex-row'>
          <div className='flex w-full max-w-[400px] flex-col items-start justify-between md:flex-row'>
            <div className='mb-3 flex items-center font-bold'>
              <Image
                src={'/static/leviathan-logo.png'}
                height={32}
                width={32}
                alt='img'
                className='mr-1 rounded-full dark:bg-white'
              />
              ACME
            </div>
            <div className='mb-3 flex flex-col space-y-3'>
              <Link href={'/'}>Home</Link>
              <Link href={'/about'}>About</Link>
              <Link href={'/terms-of-use'}>Terms of use</Link>
              <Link href={'/shipping'}>Shipping</Link>
            </div>
            <div className='mb-8'>
              <Link href={'/privacy-policy'}>Privacy Policy</Link>
            </div>
          </div>
          <div className='flex items-start'>
            <FooterSelect options={['light', 'dark', 'system']} selectedOption={theme} onClick={handleTheme} />
            <FooterSelect options={['en', 'ua', 'ru']} />
            <a href='https://github.com/anysofronova/leviathan' target='_blank' rel='noreferrer'>
              <AiFillGithub size={30} />
            </a>
          </div>
        </div>
        <div className='flex flex-col items-center justify-between pt-6 sm:flex-row'>
          <p className='text-sm text-gray-600 dark:text-white'>© 2020 ACME, Inc. All rights reserved.</p>
          <div>
            created by <b className='font-bold'>BEST DEVS</b>
          </div>
        </div>
      </div>
    </footer>
  )
}
