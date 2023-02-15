import { tokenService } from '#/shared/api/services/token.service'
import { IUserLogin, IUserRegister } from '#/shared/types'

import { instance } from '../http'

const getUser = async (id: number) => {
  return await instance.get(`/users/${id}`)
}
const register = async (userData: IUserRegister) => {
  const response = await instance.post('/auth/signup', userData)
  if (response) {
    tokenService.setCookieValue('refresh_token', response.data.refresh_token)
    tokenService.setCookieValue('access_token', response.data.access_token, { expires: response.data.expires / 86400 })
    tokenService.setUser(response.data.user)
  }

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
  const { id } = tokenService.getUser() || {}
  const { refreshToken } = tokenService.getTokens()

  try {
    const { data } = await instance.post('/auth/refresh', { userId: id, refreshToken })
    const { refresh_token, access_token, expires } = data
    tokenService.setCookieValue('refresh_token', refresh_token)
    tokenService.setCookieValue('access_token', access_token, { expires: expires / 86400 })
    instance.defaults.headers.common['Authorization'] = `Bearer ${access_token}`
  } catch (error) {
    console.error('Failed to refresh access token:', error)
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
