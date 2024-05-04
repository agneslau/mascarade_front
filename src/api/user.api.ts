import { type AxiosResponse } from 'axios'
import type { MinimalUser } from '@/types/minimalUser'
import api from '@/api/api'

//TODO : typer toutes les réponses

const API_URL = '/users'

class UserService {
  getUsers() {
    return api.get(API_URL)
  }

  getMinimalUsers(): Promise<AxiosResponse<MinimalUser[]>> {
    return api.get(API_URL + '/minimal')
  }
  getMinimalUserByEmail(email): Promise<AxiosResponse<MinimalUser>> {
    return api.get(API_URL + '/minimal/email/' + email)
  }

  addUser(user) {
    return api.post(API_URL, user)
  }

  editUser(user) {
    return api.put(API_URL + '/' + user.id, user)
  }

  deleteUser(id) {
    return api.delete(API_URL + '/' + id)
  }

  isNameTaken(name) {
    const result = api.get(API_URL + '/name/' + name)
    return result
  }

  isEmailTaken(email) {
    return api.get(API_URL + '/email/' + email)
  }
}

export default new UserService()
