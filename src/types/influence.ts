import { District } from './enums/district'
import { Specialty } from './enums/specialty'
import { Category } from './enums/category'

export interface Influence {
  id: string
  name: string
  category: Category
  specialty: Specialty
  level: number
  district: District
  characterId: string
}
