import Image from 'next/image'
import { useTranslation } from 'next-i18next'
import { CgClose } from 'react-icons/cg'

import { FormLogin, FormRegister } from '#/processes/auth'
import { UserInfo } from '#/processes/auth/ui/user-info'
import { useFormModal } from '#/shared/hooks'

export const AuthModal = () => {
  const { t } = useTranslation()
  const { hideAuth, setFormType, formType } = useFormModal()

  return (
    <>
      <div className='h-modal fixed inset-0 top-0 left-0 right-0 z-[70] h-full w-full overflow-y-auto overflow-x-hidden bg-black p-4 opacity-50' />
      <div className='fixed right-1/2 bottom-1/2 z-[80] h-auto w-[350px] translate-y-1/2 translate-x-1/2 md:w-[400px]'>
        <div className='relative border bg-white dark:border-gray-600 dark:bg-black'>
          <button
            type='button'
            className='absolute top-3 right-2.5 ml-auto inline-flex items-center rounded-lg hover:opacity-50 dark:text-white'
            onClick={() => hideAuth(false)}
          >
            <CgClose size={22} />
          </button>
          <div className='px-6 py-6 lg:px-8'>
            <div className='flex h-[150px] items-center justify-center'>
              <Image
                src={'/static/leviathan-logo.png'}
                height={64}
                width={64}
                alt='img'
                className='mx-auto rounded-full border-0 dark:bg-white'
              />
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
                  {t("Don't have an account ?")}
                  <button
                    id='signup-textbtn'
                    className='ml-1 cursor-pointer font-bold'
                    onClick={() => setFormType('register')}
                  >
                    {t('Sign Up')}
                  </button>
                </div>
              </>
            ) : null}
            {formType === 'register' ? (
              <>
                <FormRegister />
                <div className='mb-10 text-center text-sm text-black dark:text-gray-300'>
                  {t('Do you have an account ?')}
                  <button className='ml-1 cursor-pointer font-bold' onClick={() => setFormType('login')}>
                    {t('Log In')}
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
