import axios from 'axios'

const API_URL = 'http://localhost:8080/api/v1/auth/'

class AuthService {
  login(user) {
    return axios
      .post(API_URL + 'authenticate', {
        email: user.email,
        password: user.password
      })
      .then((response) => {
        if (response.data.token) {
          localStorage.setItem('user', JSON.stringify(response.data))
        }

        return response.data
      })
  }

  logout() {
    localStorage.removeItem('user')
  }
}

export default new AuthService()
