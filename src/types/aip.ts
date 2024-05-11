import type { Challenge } from '@/types/enums/challenge'
import type { Expenditure } from '@/types/expenditure'
import type { VampireAction } from '@/types/vampireAction'
import type { Hunt } from '@/types/hunt'
import type { IndirectAttackAction } from '@/types/IndirectAttackAction'
import type { GlobalAction } from '@/types/globalAction'
import type { TargetedAction } from '@/types/targetedAction'
import { HuntType } from '@/types/enums/huntType'

export interface Aip {
  characterId: string
  challenges: Challenge[]
  hunts: Hunt[]
  expenditures: Expenditure[]
  vampireActions: VampireAction[]
  targetedActions: TargetedAction[]
  globalActions: GlobalAction[]
  indirectAttackActions: IndirectAttackAction[]
  response: string
  isOpen: boolean
  isClosed: boolean
  isRendered: boolean
}

export function createEmptyAip(characterId: string): Aip {
  return {
    characterId: characterId,
    challenges: [] as Challenge[],
    hunts: [
      {
        type: HuntType.AIP,
        description: ''
      }
    ] as Hunt[],
    expenditures: [] as Expenditure[],
    vampireActions: [] as VampireAction[],
    targetedActions: [] as TargetedAction[],
    globalActions: [] as GlobalAction[],
    indirectAttackActions: [] as IndirectAttackAction[],
    response: '',
    isOpen: true,
    isClosed: false,
    isRendered: false
  }
}
