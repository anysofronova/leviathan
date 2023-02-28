'use client'

import '#/styles/globals.css'

import { ThemeProvider } from 'next-themes'
import { PropsWithChildren } from 'react'
import { Provider } from 'react-redux'

import { store } from '#/shared/store'
import { Footer, Header } from '#/widgets'

import Head from './head'

const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <html lang='en'>
      <Head></Head>
      <body className='bg-white dark:bg-[#171923]'>
        <ThemeProvider attribute='class'>
          <Provider store={store}>
            <Header />
            <main className='w-full bg-white pt-[120px] dark:bg-[#171923] dark:text-white lg:pt-[72px]'>
              <div className='mx-auto h-[auto] min-h-[100vh] max-w-[2460px]'>{children}</div>
            </main>
            <Footer />
          </Provider>
        </ThemeProvider>
      </body>
    </html>
  )
}

export default RootLayout
