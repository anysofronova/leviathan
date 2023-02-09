'use client'

import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { CgClose } from 'react-icons/cg'
import { FiShoppingCart } from 'react-icons/fi'
import { IoMdSearch } from 'react-icons/io'

import { FormLogin, FormRegister } from '#/processes/auth'
import Logo from '#/public/assets/logo.png'
import { EmptyCartMessage, FormInput, SidebarCart } from '#/shared/ui'
import { ModalAuth } from '#/shared/ui/modals'

type FormType = 'login' | 'register' | 'reset'
export const Header = () => {
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [showCart, setShowCart] = useState(false)
  const [formType, setFormType] = useState<FormType>('login')

  return (
    <>
      <div className='mx-auto flex h-[42px] max-w-[2000px] items-center justify-between border-b py-9 px-3 md:px-6'>
        <div className='flex w-full min-w-[280px] max-w-[300px] items-center'>
          <Link href={'/'}>
            <Image src={Logo} height={32} width={32} alt='img' className='mr-6' />
          </Link>
          <nav className='mr-6 flex w-[210px] justify-between text-gray-500'>
            <Link href={'/search'}>All</Link>
            <Link href={'/search/clothes'}>New Arrivals</Link>
            <Link href={'/search/featured'}>Featured</Link>
          </nav>
        </div>
        <div className='relative flex hidden w-[620px] md:block'>
          <FormInput type='text' placeholder='Page for products...' />
          <button type='button' className='absolute right-3 top-2.5'>
            <IoMdSearch size={22} />
          </button>
        </div>
        <div className='flex w-full max-w-[300px] items-center justify-end'>
          <button type='button' className='mr-6' onClick={() => setShowCart(true)}>
            <FiShoppingCart size={22} />
          </button>
          <button
            type='button'
            className='box-border h-[34px] w-[34px] rounded-3xl border-2 border-transparent bg-green-400 transition-colors hover:border-black'
            onClick={() => setShowAuthModal(true)}
          />
        </div>
      </div>
      {showCart && (
        <SidebarCart>
          <div className='flex items-center justify-between py-1 px-2'>
            <button
              type='button'
              className='inline-flex items-center rounded-lg hover:opacity-50'
              onClick={() => setShowCart(false)}
            >
              <CgClose size={22} />
              Close
            </button>
            <div className='flex w-full max-w-[300px] items-center justify-end'>
              <button type='button' className='mr-6' onClick={() => setShowCart(true)}>
                <FiShoppingCart size={22} />
              </button>
              <button
                type='button'
                className='box-border h-[34px] w-[34px] rounded-3xl border-2 border-transparent bg-green-400 transition-colors hover:border-black'
                onClick={() => {
                  setShowCart(false)
                  setShowAuthModal(true)
                }}
              />
            </div>
          </div>
          <EmptyCartMessage />
        </SidebarCart>
      )}
      {showAuthModal && (
        <ModalAuth>
          <div className='relative border bg-white dark:bg-gray-700'>
            <button
              type='button'
              className='absolute top-3 right-2.5 ml-auto inline-flex items-center rounded-lg hover:opacity-50'
              onClick={() => setShowAuthModal(false)}
            >
              <CgClose size={22} />
            </button>
            <div className='px-6 py-6 lg:px-8'>
              <div className='flex h-[150px] items-center justify-center'>
                <Image src={Logo} height={64} width={64} alt='img' className='mx-auto' />
              </div>

              {formType === 'login' ? (
                <>
                  <FormLogin />
                  <div className='mb-10 text-center text-sm text-black dark:text-gray-300'>
                    Don&apos;t have an account ?
                    <button className='ml-1 cursor-pointer font-bold' onClick={() => setFormType('register')}>
                      Sign up
                    </button>
                  </div>
                </>
              ) : null}
              {formType === 'register' ? (
                <>
                  <FormRegister />
                  <div className='mb-10 text-center text-sm text-black dark:text-gray-300'>
                    Do you have an account ?
                    <button className='ml-1 cursor-pointer font-bold' onClick={() => setFormType('login')}>
                      Log In
                    </button>
                  </div>
                </>
              ) : null}
            </div>
          </div>
        </ModalAuth>
      )}
    </>
  )
}
