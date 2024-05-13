import type { Aip } from '@/types/aip'

export interface AipSession {
  id: string
  name: string
  beginDate: Date
  endDate: Date
  isOpen: boolean
  isClosed: boolean
  isRendered: boolean
  aips: Aip[]
}

export function createEmptyAipSession(): AipSession {
  return {
    id: '',
    name: '',
    beginDate: new Date(),
    endDate: new Date(),
    isOpen: false,
    isClosed: false,
    isRendered: false,
    aips: [] as Aip[]
  }
}
