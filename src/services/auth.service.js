import api from '@/api/api'
import TokenService from '@/services/token.service.js'

const API_URL = '/auth/'

class AuthService {
  login(user) {
    return api
      .post(API_URL + 'authenticate', {
        email: user.email,
        password: user.password
      })
      .then((response) => {
        console.log(response.data)
        if (response.data.accessToken) {
          TokenService.setUser(response.data)
        }

        return response.data
      })
  }

  logout() {
    TokenService.removeUser()
  }
}

export default new AuthService()
