import { Clan } from './enums/clan'
import { Ritual } from './enums/ritual'
import { Asset } from './enums/asset'
import type { Herd } from '@/types/herd'

export interface Character {
  id: string
  name: string
  creationDate: Date
  clan: Clan
  competences: {
    INFORMATIQUE: number
    LANGUES: number
  }
  assets: Asset[]
  herd: Herd
  rituals: Ritual[]
  playerId: string
}
