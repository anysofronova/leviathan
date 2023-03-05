import '#/styles/globals.css'

import { AbstractIntlMessages, NextIntlClientProvider } from 'next-intl'
import { ThemeProvider } from 'next-themes'
import { PropsWithChildren } from 'react'
import { Provider } from 'react-redux'

import enMessage from '#/messages/en.json'
import ruMessage from '#/messages/ru.json'
import uaMessage from '#/messages/ua.json'
import { store } from '#/shared/store'
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
      <body className='bg-white dark:bg-[#171923]'>
        <ThemeProvider attribute='class'>
          <NextIntlClientProvider locale={locale} messages={getLocaleMessages(locale)}>
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