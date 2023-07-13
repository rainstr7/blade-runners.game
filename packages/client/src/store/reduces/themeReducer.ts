import type { ActionInterface, ThemePayloadInterface } from './interfaces'
import { SET_THEME } from '../actions/types'

const initialState: ThemePayloadInterface = {
  theme: 'dark',
}

export default function themeReducer(
  state = initialState,
  action: ActionInterface & { payload: ThemePayloadInterface }
) {
  switch (action.type) {
    case SET_THEME:
      return {
        theme: action.payload.theme,
      }
    default:
      return state
  }
}
