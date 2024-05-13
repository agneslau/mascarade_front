import type { Role } from '@/types/enums/role'

export interface User {
  id: string
  name: string
  email: string
  roles: Role[]
  password: string
  charactersIds: string[]
}
