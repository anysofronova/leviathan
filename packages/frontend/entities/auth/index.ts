import { create, SetState } from 'zustand'

import { authService, tokenService } from '#/shared/api/services'
import { IUser, IUserLogin, IUserRegister } from '#/shared/types'
import { withLoading } from '#/shared/utils'

interface IAuthStore {
  user: IUser | null
  loading: boolean
  register: (user: IUserRegister) => Promise<void>
  login: (user: IUserLogin) => Promise<void>
  logout: (id: number) => Promise<void>
}

export const useAuth = create<IAuthStore>((set: SetState<IAuthStore>) => ({
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
