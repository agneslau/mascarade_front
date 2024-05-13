export interface VampireAction {
  title: string
  description: string
  response: string
  notes: string
  isEffective: boolean
}

export function createEmptyVampireAction(): VampireAction {
  return {
    title: '',
    description: '',
    response: '',
    notes: '',
    isEffective: false
  }
}
