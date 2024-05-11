import { type AxiosResponse } from 'axios'
import type { MinimalUser } from '@/types/minimalUser'
import api from '@/api/api'
import type { User } from '@/types/user'

const API_URL = '/users'

class UserService {
  getUsers(): Promise<AxiosResponse<User[]>> {
    return api.get(API_URL)
  }

  getMinimalUsers(): Promise<AxiosResponse<MinimalUser[]>> {
    return api.get(API_URL + '/minimal')
  }
  getMinimalUserByEmail(email: string): Promise<AxiosResponse<MinimalUser>> {
    return api.get(API_URL + '/minimal/email/' + email)
  }

  addUser(user: User): Promise<AxiosResponse<User>> {
    return api.post(API_URL, user)
  }

  editUser(user: User): Promise<AxiosResponse<User>> {
    return api.put(API_URL + '/' + user.id, user)
  }

  deleteUser(id: string): Promise<AxiosResponse<void>> {
    return api.delete(API_URL + '/' + id)
  }

  isNameTaken(name: string): Promise<AxiosResponse<boolean>> {
    return api.get(API_URL + '/name/' + name)
  }

  isEmailTaken(email): Promise<AxiosResponse<boolean>> {
    return api.get(API_URL + '/email/' + email)
  }
}

export default new UserService()
