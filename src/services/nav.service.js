import axios from 'axios'
import authHeader from './auth-header'

const API_URL = 'http://localhost:8080/api/v1/test'

class NavService {
  getPublicContent() {
    return axios.get(API_URL + '/all', { headers: authHeader() })
  }

  getPlayerBoard() {
    return axios.get(API_URL + '/player', { headers: authHeader() })
  }

  getStorytellerBoard() {
    return axios.get(API_URL + '/storyteller', { headers: authHeader() })
  }

  getAdminBoard() {
    return axios.get(API_URL + '/admin', { headers: authHeader() })
  }
}

export default new NavService()
