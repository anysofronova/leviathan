import axios from 'axios'
import process from 'process'

import { authService } from '../services'

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
  const auth = authService.checkToken()
  if (config.headers && auth) {
    config.headers.Authorization = auth
  }
  return config
})
