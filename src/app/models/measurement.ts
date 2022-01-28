export interface Measurement {
  _id?: string,
  gender?: Gender
  userId: string
  age: number
  height: number
  weight: number
}

export type Gender = 'male' | 'female'
