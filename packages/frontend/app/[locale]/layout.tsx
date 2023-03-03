'use client'

import '#/styles/globals.css'

import { NextIntlClientProvider } from 'next-intl'
import { ThemeProvider } from 'next-themes'
import { PropsWithChildren } from 'react'
import { Provider } from 'react-redux'

import { store } from '#/shared/store'
import enMessage from '#/translations/en.json'
import ruMessage from '#/translations/ru.json'
import uaMessage from '#/translations/ua.json'
import { Footer, Header } from '#/widgets'

import Head from './head'

export default function RootLayout({
  children,
  params: { locale }
}: PropsWithChildren<{ params: { locale: string } }>) {
  const checkLocale = () => {
    switch (locale) {
      case 'ua': {
        return uaMessage
      }
      case 'ru': {
        return ruMessage
      }
      default: {
        return enMessage
      }
    }
  }
  return (
    <html lang={locale}>
      <Head></Head>
      <body className='bg-white dark:bg-[#171923]'>
        <ThemeProvider attribute='class'>
          <NextIntlClientProvider locale={locale} messages={checkLocale()}>
            <Provider store={store}>
              <Header />
              <main className='w-full bg-white pt-[120px] dark:bg-[#171923] dark:text-white lg:pt-[72px]'>
                <div className='mx-auto h-[auto] min-h-[100vh] max-w-[2460px]'>{children}</div>
              </main>
              <Footer />
            </Provider>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
