import { AlertInterface } from '../reduces/interfaces'
import { HIDE_ALERT, SHOW_ALERT } from './types'

export const showAlert = (payload: AlertInterface) => {
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
