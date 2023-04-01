import { PropsWithChildren } from 'react'

import { modalSelectors } from '#/entities'
import { AllProviders } from '#/shared/ui/all-providers'
import { Footer, Header } from '#/widgets'

export const BasicLayout = ({ children }: PropsWithChildren) => {
  const authModal = modalSelectors.use.modalsAuth()
  const cartModal = modalSelectors.use.modalsCart()
  return (
    <AllProviders>
      <Header />
      <div className={`${authModal || cartModal ? 'blur-sm' : ''}`}>
        <main className='w-full bg-white pt-[134px] dark:bg-black dark:text-white lg:pt-[72px]'>
          <div className='mx-auto max-w-[2460px]'>{children}</div>
        </main>
        <Footer />
      </div>
    </AllProviders>
  )
}
