import axios from 'axios'
import process from 'process'

import { authService, tokenService } from '#/shared/api/services'

const headerParams = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*'
}
export const instance = axios.create({
  baseURL: process.env.API_URL,
  ...headerParams
})

instance.interceptors.request.use(config => {
  const auth = tokenService.getTokens().accessToken
  if (config.headers && auth) {
    config.headers.Authorization = `Bearer ${auth}`
  }
  return config
})

instance.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      try {
        await authService.getRefreshToken()
        return instance(originalRequest)
      } catch (error) {
        await tokenService.clearData()
        throw error
      }
    }
    throw error
  }
)
