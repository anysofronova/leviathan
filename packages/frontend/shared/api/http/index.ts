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

type Subscriber = Parameters<typeof subscribeTokenRefresh>[0]

let isRefreshing = false
let subscribers: Subscriber[] = []

const subscribeTokenRefresh = (cb: (token: string) => void): void => {
  subscribers.push(cb)
}

const onRefreshed = (token: string) => {
  subscribers.map(cb => cb(token))
}

instance.interceptors.response.use(undefined, err => {
  const status = err?.response?.status
  const originalRequest = err?.config

  if (status === 401) {
    if (!isRefreshing) {
      isRefreshing = true
      authService.getRefreshToken().then(response => {
        const token = response?.access_token ?? ''
        if (!token) return

        isRefreshing = false
        onRefreshed(token)
        subscribers = []
      })
    }

    return new Promise((resolve, reject) => {
      subscribeTokenRefresh(token => {
        if (!token) reject('Token was not provided!')
        instance.defaults.headers.common['Authorization'] = `Bearer ${token}`
        resolve(instance(originalRequest))
      })
    })
  }

  return Promise.reject(err)
})
