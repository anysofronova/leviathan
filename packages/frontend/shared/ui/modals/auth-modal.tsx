'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { CgClose } from 'react-icons/cg'

import { FormLogin, FormRegister } from '#/processes/auth'
import { UserInfo } from '#/processes/auth/ui/user-info'
import { useAuth } from '#/shared/hooks'

type AuthModalProps = {
  hideAuthForm: () => void
}

type AuthModalType = 'login' | 'register' | 'auth'

export const AuthModal = ({ hideAuthForm }: AuthModalProps) => {
  const user = useAuth()
  const [formType, setFormType] = useState<AuthModalType>(user ? 'auth' : 'login')

  useEffect(() => {
    if (user) {
      setFormType('auth')
    } else {
      setFormType('login')
    }
  }, [user])

  return (
    <>
      <div className='h-modal fixed inset-0 top-0 left-0 right-0 z-[70] h-full w-full overflow-y-auto overflow-x-hidden bg-black p-4 opacity-50' />
      <div className='fixed right-1/2 bottom-1/2 z-[80] h-auto w-[350px] translate-y-1/2 translate-x-1/2 md:w-[400px]'>
        <div className='relative border bg-white dark:bg-gray-700'>
          <button
            type='button'
            className='absolute top-3 right-2.5 ml-auto inline-flex items-center rounded-lg hover:opacity-50'
            onClick={hideAuthForm}
          >
            <CgClose size={22} />
          </button>
          <div className='px-6 py-6 lg:px-8'>
            <div className='flex h-[150px] items-center justify-center'>
              <Image src={'/static/leviathan-logo.png'} height={64} width={64} alt='img' className='mx-auto' />
            </div>
            {formType === 'auth' ? (
              <>
                <UserInfo />
              </>
            ) : null}
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
      </div>
    </>
  )
}
