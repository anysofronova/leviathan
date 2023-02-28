import { tokenService } from '#/shared/api/services/token.service'
import { IUserLogin, IUserRegister } from '#/shared/types'

import { instance } from '../http'

const getUser = async (id: number) => {
  return await instance.get(`/users/${id}`)
}
const register = async (userData: IUserRegister) => {
  const response = await instance.post('/auth/signup', userData)
  return response.data
}

const login = async (userData: IUserLogin) => {
  const response = await instance.post('/auth/signin', userData)
  if (response) {
    tokenService.setCookieValue('refresh_token', response.data.refresh_token)
    tokenService.setCookieValue('access_token', response.data.access_token, { expires: response.data.expires / 86400 })
    tokenService.setUser(response.data.user)
  }

  return response.data
}

const getRefreshToken = async () => {
  const refreshToken = tokenService.getTokens().refreshToken
  const userId = tokenService.getUser()?.id
  try {
    const { data: response } = await instance.post('/auth/refresh', {
      userId,
      refreshToken
    })
    const { refresh_token, access_token } = response
    if (!response) {
      tokenService.clearData()

      return
    }
    tokenService.setCookieValue('refresh_token', refresh_token)
    tokenService.setCookieValue('access_token', access_token, { expires: 54000 / 86400 })

    return response
  } catch (_error) {
    tokenService.clearData()
  }
}

const logout = async (userId: number) => {
  await instance
    .post('/auth/logout', { userId })
    .then(() => tokenService.clearData())
    .catch(e => console.log(e))
}

export const authService = {
  register,
  logout,
  login,
  getRefreshToken,
  getUser
}
