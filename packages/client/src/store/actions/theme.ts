import { ThemePayloadInterface } from '../reduces/interfaces'
import { SET_THEME } from './types'

export const setTheme = (payload: ThemePayloadInterface) => {
  return {
    type: SET_THEME,
    payload,
  }
}
