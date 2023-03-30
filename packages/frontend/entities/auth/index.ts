import { create } from 'zustand'

import { authService, tokenService } from '#/shared/api/services'
import { createSelectorFunctions } from '#/shared/lib/selectors'
import { IUser, IUserLogin, IUserRegister } from '#/shared/types'
import { withLoading } from '#/shared/utils'

interface IAuthStore {
  user: IUser | null
  loading: boolean
  register: (user: IUserRegister) => Promise<void>
  login: (user: IUserLogin) => Promise<void>
  logout: (id: number) => Promise<void>
}

export const useAuth = create<IAuthStore>(set => ({
  user: tokenService.getUser(),
  loading: false,
  register: withLoading(async (user: IUserRegister) => {
    await authService.register(user)
  }, set),
  login: withLoading(async (user: IUserLogin) => {
    const response = await authService.login(user)
    set({ user: response.user })
  }, set),
  logout: withLoading(async (id: number) => {
    await authService.logout(id)
    set({ user: null })
  }, set)
}))

export const authSelectors = createSelectorFunctions(useAuth)
