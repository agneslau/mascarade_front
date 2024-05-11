import api from '@/api/api'
import type { AuthRequest } from '@/types/authRequest'

const API_URL = '/auth/'

class AuthApi {
  login(authRequest: AuthRequest) {
    return api.post(API_URL + 'authenticate', authRequest)
  }
}

export default new AuthApi()
