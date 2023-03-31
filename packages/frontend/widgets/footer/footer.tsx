import Image from 'next/image'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { AiFillGithub } from 'react-icons/ai'

import { FooterSelect } from '#/shared/ui'

export const Footer = () => {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()
  const [lang, setLang] = useState(
    (typeof window !== 'undefined' && (localStorage.getItem('i18nextLng') as string)) || 'en'
  )
  const { i18n, t } = useTranslation()
  useEffect(() => {
    setMounted(true)
  }, [])
  const handleTheme = (elem: string) => {
    setTheme(elem)
  }

  const handleLocale = (l: string) => {
    i18n.changeLanguage(l)
    setLang(l)
  }

  if (!mounted) {
    return null
  }

  return (
    <footer className='border-t bg-white p-5 text-black dark:border-gray-600 dark:bg-black dark:text-white'>
      <div className='mx-auto max-w-[1220px]'>
        <div className='flex flex-col justify-between border-b pb-8 pt-5 dark:border-gray-600 sm:flex-row'>
          <div className='flex w-full max-w-[500px] flex-col items-start justify-between md:flex-row'>
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
            <div className='mb-3 mr-5 flex max-w-min flex-col space-y-3 transition-all'>
              <Link href={'/'} className='hover:opacity-70'>
                {t('Home')}
              </Link>
              <Link href={'/about'} className='hover:opacity-70'>
                {t('About')}
              </Link>
              <Link href={'/terms-of-use'} className='hover:opacity-70'>
                {t('Terms of use')}
              </Link>
              <Link href={'/shipping'} className='hover:opacity-70'>
                {t('Shipping')}
              </Link>
            </div>
            <div className='mb-8'>
              <Link href={'/privacy-policy'} className='hover:opacity-70'>
                {t(' Privacy Policy')}
              </Link>
            </div>
          </div>
          <div className='flex items-start'>
            <FooterSelect options={['light', 'dark', 'system']} selectedOption={theme} onClick={handleTheme} />
            <FooterSelect options={['en', 'ua', 'ru']} selectedOption={lang} onClick={handleLocale} />
            <a href='https://github.com/anysofronova/leviathan' target='_blank' rel='noreferrer'>
              <AiFillGithub size={30} />
            </a>
          </div>
        </div>
        <div className='flex flex-col items-center justify-between pt-6 sm:flex-row'>
          <p className='text-sm text-gray-600 dark:text-gray-400'>© 2020 ACME, Inc. {t('All rights reserved')}</p>
          <div>
            created by <b className='font-bold'>BEST DEVS</b>
          </div>
        </div>
      </div>
    </footer>
  )
}
