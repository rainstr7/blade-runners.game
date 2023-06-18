import type { ActionInterface, AlertPayloadInterface } from './interfaces'
import { HIDE_ALERT, SHOW_ALERT } from '../actions/types'

const initialState: AlertPayloadInterface = {
  show: false,
  type: 'success',
  text: '',
}

export default function alertReducer(
  state = initialState,
  action: ActionInterface & { payload: AlertPayloadInterface }
) {
  switch (action.type) {
    case SHOW_ALERT:
      return {
        ...state,
        ...action.payload,
      }
    case HIDE_ALERT:
      return {
        ...state,
        ...initialState,
      }
    default:
      return state
  }
}
