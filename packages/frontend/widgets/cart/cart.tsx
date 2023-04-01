import { motion } from 'framer-motion'
import { useTranslation } from 'next-i18next'
import { useEffect } from 'react'
import { CgClose } from 'react-icons/cg'
import { FiShoppingCart } from 'react-icons/fi'

import { modalSelectors } from '#/entities'
import { cartSelectors } from '#/entities/cart'
import { CartContent, CartCount, EmptyCartMessage } from '#/shared/ui'

export const Cart = () => {
  const cartGoods = cartSelectors.use.cartGoods()
  const toggleCart = modalSelectors.use.toggleCart()
  const toggleAuth = modalSelectors.use.toggleAuth()
  const { t } = useTranslation()

  const cartVariants = {
    hidden: { x: '100%' },
    visible: {
      x: '0%',
      transition: { duration: 0.2, ease: 'easeInOut' }
    },
    exit: {
      x: '100%',
      transition: { duration: 0.2, ease: 'easeInOut' }
    }
  }

  useEffect(() => {
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [])
  return (
    <>
      <motion.div
        className='h-modal fixed inset-0 top-0 left-0 right-0 z-[70] h-full w-full overflow-y-auto overflow-x-hidden bg-black p-4'
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        exit={{ opacity: 0 }}
      />
      <motion.div
        className='fixed right-0  top-0 z-[80] flex h-full min-h-full w-full flex-col bg-white text-black backdrop-blur-none dark:bg-black dark:text-white md:w-[400px]'
        initial='hidden'
        animate='visible'
        exit='exit'
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 20
        }}
        variants={cartVariants}
      >
        <div className='flex items-center justify-between px-3 py-5 md:px-6'>
          <button
            type='button'
            className='inline-flex items-center rounded-lg hover:opacity-50'
            onClick={() => toggleCart(false)}
          >
            <CgClose size={22} />
            {t('Close')}
          </button>
          <div className='flex w-full max-w-[300px] items-center justify-end'>
            <button
              type='button'
              className='relative mr-6'
              onClick={() => {
                toggleCart(false)
                toggleAuth(false)
              }}
            >
              <FiShoppingCart size={22} />
              <CartCount />
            </button>
            <button
              type='button'
              id='auth-btn'
              className='box-border h-[34px] w-[34px] rounded-3xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transition-colors hover:from-indigo-700 hover:via-purple-800 hover:to-pink-700'
              onClick={() => {
                toggleAuth(true)
                toggleCart(false)
              }}
            />
          </div>
        </div>
        {cartGoods?.length === 0 ? <EmptyCartMessage /> : <CartContent />}
      </motion.div>
    </>
  )
}
