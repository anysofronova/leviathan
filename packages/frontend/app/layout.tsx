'use client'

import '#/styles/globals.css'

import { PropsWithChildren } from 'react'

import { Footer, Header } from '#/widgets'

const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <html lang='en'>
      <head />
      <body>
        <Header />
        <main className='mx-auto max-w-[2460px]'>{children}</main>
        <Footer />
      </body>
    </html>
  )
}

export default RootLayout
