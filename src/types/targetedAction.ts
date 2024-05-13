import type { TargetedActionType } from '@/types/enums/targetedActionType'

export interface TargetedAction {
  response: string
  points: number
  influenceId: string
  targetName: string
  type: TargetedActionType
}
