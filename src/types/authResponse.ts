import type { Role } from '@/types/enums/role'

export interface AuthResponse {
  name: string
  email: string
  accessToken: string
  refreshToken: string
  roles: Role[]
}
