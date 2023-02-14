'use client'

import '#/styles/globals.css'

import { PropsWithChildren } from 'react'
import { Provider } from 'react-redux'

import { store } from '#/shared/store'
import { Footer, Header } from '#/widgets'

const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <html lang='en'>
      <head />
      <body>
        <Provider store={store}>
          <Header />
          <main className='mx-auto max-w-[2460px] pt-[120px] lg:pt-[72px]'>{children}</main>
          <Footer />
        </Provider>
      </body>
    </html>
  )
}

export default RootLayout
