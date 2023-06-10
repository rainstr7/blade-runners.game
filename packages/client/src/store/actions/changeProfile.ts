import { CREATE_PROFILE, UPDATE_PROFILE, CLEAN_PROFILE } from './types'
import { UserPayloadInterface } from '../reduces/interfaces'

export const changeProfile = (payload: UserPayloadInterface) => {
  return {
    type: UPDATE_PROFILE,
    payload,
  }
}

export const createProfile = (payload: UserPayloadInterface) => {
  return {
    type: CREATE_PROFILE,
    payload,
  }
}

export const cleanProfile = () => {
  return {
    type: CLEAN_PROFILE,
  }
}
