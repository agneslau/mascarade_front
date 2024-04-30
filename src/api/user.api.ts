import axios, { type AxiosResponse } from 'axios'
import authHeader from '../services/auth-header'
import type { MinimalUser } from '@/types/minimalUser'

//TODO : typer toutes les réponses

const API_URL = 'http://localhost:8080/api/v1/users'

class UserService {
  getUsers() {
    return axios.get(API_URL, { headers: authHeader() })
  }

  getMinimalUsers(): Promise<AxiosResponse<MinimalUser[]>> {
    return axios.get(API_URL + '/minimal', { headers: authHeader() })
  }
  getMinimalUserByEmail(email): Promise<AxiosResponse<MinimalUser>> {
    return axios.get(API_URL + '/minimal/email/' + email, { headers: authHeader() })
  }

  addUser(user) {
    return axios.post(API_URL, user, { headers: authHeader() })
  }

  editUser(user) {
    return axios.put(API_URL + '/' + user.id, user, { headers: authHeader() })
  }

  deleteUser(id) {
    return axios.delete(API_URL + '/' + id, { headers: authHeader() })
  }

  isNameTaken(name) {
    const result = axios.get(API_URL + '/name/' + name, { headers: authHeader() })
    console.log(result)
    return result
  }

  isEmailTaken(email) {
    return axios.get(API_URL + '/email/' + email, { headers: authHeader() })
  }
}

export default new UserService()
