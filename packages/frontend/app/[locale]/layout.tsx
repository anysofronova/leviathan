'use client'

import '#/styles/globals.css'

import { AbstractIntlMessages, NextIntlClientProvider as NextIntlClient } from 'next-intl'
import { PropsWithChildren } from 'react'

import enMessage from '#/messages/en.json'
import ruMessage from '#/messages/ru.json'
import uaMessage from '#/messages/ua.json'
import { AllProviders } from '#/shared/ui/all-providers'
import { Footer, Header } from '#/widgets'

import Head from './head'

const getLocaleMessages = (locale: string) => {
  const messages: Record<string, AbstractIntlMessages | undefined> = {
    en: enMessage,
    ru: ruMessage,
    ua: uaMessage
  }

  return messages[locale] ?? enMessage
}

export default function RootLayout({
  children,
  params: { locale }
}: PropsWithChildren<{ params: { locale: string } }>) {
  return (
    <html lang={locale}>
      <Head />
      <body className='bg-white dark:bg-black'>
        <AllProviders>
          <NextIntlClient locale={locale} messages={getLocaleMessages(locale)}>
            <Header />
            <main className='w-full bg-white pt-[150px] dark:bg-black dark:text-white lg:pt-[72px]'>
              <div className='mx-auto max-w-[2460px]'>{children}</div>
            </main>
            <Footer />
          </NextIntlClient>
        </AllProviders>
      </body>
    </html>
  )
}
