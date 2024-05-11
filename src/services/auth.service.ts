import TokenService from '@/services/token.service'
import AuthApi from '@/api/auth.api'
import type { AuthRequest } from '@/types/authRequest'
import type { AuthResponse } from '@/types/authResponse'
import router from '@/router'

class AuthService {
  login(authRequest: AuthRequest) {
    console.log(authRequest)
    return AuthApi.login(authRequest).then(
      (response: { data: AuthResponse }) => {
        console.log(response)
        if (response.data.accessToken) {
          TokenService.setUser(response.data)
        }
        return response.data
      },
      (error) => {
        console.log(error)
        router.push('/login')
        return Promise.reject(error)
      }
    )
  }

  logout(): void {
    TokenService.removeUser()
    router.push('/login')
  }
}

export default new AuthService()
