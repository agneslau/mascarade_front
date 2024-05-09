export interface Expenditure {
  sum: number
  reason: string
  response: string
}

export function createEmptyExpenditure(): Expenditure {
  return {
    sum: 0,
    reason: '',
    response: ''
  }
}
