import { UpdateUserDataPayloadInterface } from '../reduces/interfaces'
import { CREATE_PROFILE, UPDATE_PROFILE, CLEAN_PROFILE } from './types'

export const changeProfile = (payload: UpdateUserDataPayloadInterface) => {
  return {
    type: UPDATE_PROFILE,
    payload,
  }
}

export const createProfile = (payload: UpdateUserDataPayloadInterface) => {
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
