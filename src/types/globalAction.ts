import type { Specialty } from '@/types/enums/specialty'
import type { GlobalActionType } from '@/types/enums/globalActionType'

export interface GlobalAction {
  response: string
  points: number
  influenceId: string
  description: string
  specialty: Specialty
  type: GlobalActionType
  isSpecialtyRespected: boolean
}
