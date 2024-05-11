import type { AuthResponse } from '@/types/authResponse'

class TokenService {
  getLocalRefreshToken(): string {
    const user = JSON.parse(localStorage.getItem('user'))
    return user?.refreshToken
  }

  getLocalAccessToken(): string {
    const user = JSON.parse(localStorage.getItem('user'))
    return user?.accessToken
  }

  updateLocalAccessToken(token) {
    const user = JSON.parse(localStorage.getItem('user'))
    user.accessToken = token
    localStorage.setItem('user', JSON.stringify(user))
  }

  getUser(): AuthResponse {
    return JSON.parse(localStorage.getItem('user'))
  }

  setUser(user: AuthResponse): void {
    localStorage.setItem('user', JSON.stringify(user))
  }

  removeUser(): void {
    localStorage.removeItem('user')
  }
}

export default new TokenService()
