import {Injectable} from '@angular/core';
import {Gender} from "../models/measurement";


export type IdealUnit = { from: number, to: number }

@Injectable({
  providedIn: 'root'
})
export class HealthService {

  constructor() {
  }

  // age in months
  // height in cm
  getIdealWeight(age: number, gender: Gender): IdealUnit {
    if (age < 0) throw new Error(`age (${age}) cannot be negative`)
    if (gender == 'male') {
      if (age <= 12)
        return {from: 7.7, to: 12}
      if (age <= 18)
        return {from: 8.8, to: 13.7}
      if (age <= 24)
        return {from: 9.7, to: 15.3}
      if (age <= 30)
        return {from: 10.5, to: 16.9}
      if (age <= 36)
        return {from: 11.3, to: 18.3}
      if (age <= 42)
        return {from: 12, to: 19.7}
      if (age <= 48)
        return {from: 12.7, to: 21.2}
      if (age <= 54)
        return {from: 13.4, to: 22.7}
      if (age <= 60)
        return {from: 14.1, to: 24.2}
    } else {
      if (age <= 12)
        return {from: 7, to: 12}
      if (age <= 18)
        return {from: 8.1, to: 13.2}
      if (age <= 24)
        return {from: 9, to: 14.8}
      if (age <= 30)
        return {from: 10, to: 16.5}
      if (age <= 36)
        return {from: 11, to: 17.5}
      if (age <= 42)
        return {from: 11.6, to: 19.8}
      if (age <= 48)
        return {from: 12.3, to: 21.5}
      if (age <= 54)
        return {from: 13, to: 23.2}
      if (age <= 60)
        return {from: 13.7, to: 24.9}
    }
    throw new Error(`age (${age}) has to be smaller than 5 years`)
  }

  // age in months
  // height in cm
  getIdealHeight(age: number, gender: Gender): IdealUnit {
    if (age < 0) throw new Error(`age (${age}) cannot be negative`)
    if (gender == 'male') {
      if (age <= 12)
        return {from: 71, to: 80.5}
      if (age <= 24)
        return {from: 81.7, to: 93.9}
      if (age <= 36)
        return {from: 88.7, to: 103.5}
      if (age <= 48)
        return {from: 94.9, to: 111.7}
      if (age <= 60)
        return {from: 100.7, to: 119.2}
    } else {
      if (age <= 12)
        return {from: 68.9, to: 79.2}
      if (age <= 24)
        return {from: 80, to: 92.9}
      if (age <= 36)
        return {from: 88.7, to: 102.7}
      if (age <= 48)
        return {from: 94.1, to: 111.3}
      if (age <= 60)
        return {from: 99.9, to: 118.2}
    }
    throw new Error(`age (${age}) has to be smaller than 5 years`)
  }
}

