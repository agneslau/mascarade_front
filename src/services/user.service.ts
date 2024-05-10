import axios from 'axios'
import authHeader from './auth-header'
import UserApi from '@/api/user.api'
import type { MinimalUser } from '@/types/minimalUser'

const API_URL = 'http://localhost:8080/api/v1/users'
//TODO : refactor to call API from user.api.ts

class UserService {
  getUsers() {
    return axios.get(API_URL, { headers: authHeader() })
  }

  getMinimalUsers(): Promise<MinimalUser[]> {
    return UserApi.getMinimalUsers().then(
      (response: { data: MinimalUser[] }) => {
        return response.data
      },
      (error) => {
        return error.response?.data?.message || error.message || error.toString()
      }
    )
  }
  getMinimalUserByEmail(email: string): Promise<MinimalUser> {
    return UserApi.getMinimalUserByEmail(email).then(
      (response: { data: MinimalUser }) => {
        return response.data
      },
      (error) => {
        return error.response?.data?.message || error.message || error.toString()
      }
    )
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
    return axios.get(API_URL + '/name/' + name, { headers: authHeader() })
  }

  isEmailTaken(email) {
    return axios.get(API_URL + '/email/' + email, { headers: authHeader() })
  }
}

export default new UserService()
