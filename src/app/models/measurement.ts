export interface Measurement {
  _id?: string,
  userId: string
  height: number
  weight: number

  gender?: Gender
  age?: number
  patientName?: string
}

export type Gender = 'male' | 'female'
