import { useCallback, useEffect, useState } from 'react'

import { authSelectors, modalSelectors } from '#/entities'

type AuthModalType = 'login' | 'register' | 'auth'

export const useFormModal = () => {
  const user = authSelectors.use.user()
  const hideAuth = modalSelectors.use.toggleAuth()
  const [formType, setFormType] = useState<AuthModalType>(user ? 'auth' : 'login')

  const updateFormType = useCallback(() => {
    setFormType(user ? 'auth' : 'login')
  }, [user])

  useEffect(() => {
    updateFormType()
  }, [user, updateFormType])

  useEffect(() => {
    const setBodyOverflow = (overflow: string) => {
      document.body.style.overflow = overflow
    }

    setBodyOverflow('hidden')

    return () => {
      setBodyOverflow('auto')
    }
  }, [])

  return {
    hideAuth,
    setFormType,
    formType
  }
}
