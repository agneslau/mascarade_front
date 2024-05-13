import UserApi from '@/api/user.api'
import type { MinimalUser } from '@/types/minimalUser'
import type { User } from '@/types/user'

class UserService {
  getUsers(): Promise<User[]> {
    return UserApi.getUsers().then(
      (response: { data: User[] }) => {
        return response.data
      },
      (error) => {
        return error.response?.data?.message || error.message || error.toString()
      }
    )
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

  addUser(user: User): Promise<User> {
    return UserApi.addUser(user).then(
      (response: { data: User }) => {
        return response.data
      },
      (error) => {
        return error.response?.data?.message || error.message || error.toString()
      }
    )
  }

  editUser(user: User): Promise<User> {
    return UserApi.editUser(user).then(
      (response: { data: User }) => {
        return response.data
      },
      (error) => {
        return error.response?.data?.message || error.message || error.toString()
      }
    )
  }

  deleteUser(id: string): Promise<void> {
    return UserApi.deleteUser(id).then(
      () => {},
      (error) => {
        return error.response?.data?.message || error.message || error.toString()
      }
    )
  }

  isNameTaken(name: string): Promise<boolean> {
    return UserApi.isNameTaken(name).then(
      (response: { data: boolean }) => {
        return response.data
      },
      (error) => {
        return error.response?.data?.message || error.message || error.toString()
      }
    )
  }

  isEmailTaken(email: string): Promise<boolean> {
    return UserApi.isEmailTaken(email).then(
      (response: { data: boolean }) => {
        return response.data
      },
      (error) => {
        return error.response?.data?.message || error.message || error.toString()
      }
    )
  }
}

export default new UserService()
