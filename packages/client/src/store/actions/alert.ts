import { HIDE_ALERT, SHOW_ALERT } from './types'
import { AlertPayloadInterface } from '../reduces/interfaces'

export const showAlert = (payload: AlertPayloadInterface) => {
  return {
    type: SHOW_ALERT,
    payload,
  }
}

export const hideAlert = () => {
  return {
    type: HIDE_ALERT,
  }
}
