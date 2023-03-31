import Cookies, { CookieAttributes } from 'js-cookie'

import { IUser } from '#/shared/types'

interface IToken {
  accessToken: string | null | undefined
  refreshToken: string | null | undefined
}

interface ITokenService {
  setCookieValue(name: string, value: string, options?: CookieAttributes): void
  removeCookieValue(name: string, options?: CookieAttributes): void
  getTokens(): IToken
  getUser(): IUser | null
  setUser(user: IUser | null): void
  clearData(): void
}

class TokenService implements ITokenService {
  private readonly COOKIE_NAMES = ['access_token', 'refresh_token']

  setCookieValue(name: string, value: string, options?: CookieAttributes): void {
    Cookies.set(name, value, { ...options })
  }

  removeCookieValue(name: string, options?: CookieAttributes): void {
    Cookies.remove(name, { ...options })
  }

  getTokens(): IToken {
    const accessToken = Cookies.get('access_token')
    const refreshToken = Cookies.get('refresh_token')

    return { accessToken, refreshToken }
  }

  getUser = (): IUser | null => {
    if (typeof window !== 'undefined') {
      try {
        const value = window.localStorage.getItem('user')
        return value && value !== 'undefined' ? JSON.parse(value) : null
      } catch (err) {
        console.error('Error parsing user data', err)
        return null
      }
    }
    return null
  }

  setUser(user: IUser | null): void {
    localStorage.setItem('user', JSON.stringify(user))
  }

  clearData(): void {
    if (typeof window !== 'undefined') {
      this.COOKIE_NAMES.forEach(cookieName => {
        this.removeCookieValue(cookieName)
      })
      localStorage.removeItem('user')
      localStorage.removeItem('cart-storage')
    }
  }
}

export const tokenService = new TokenService()
