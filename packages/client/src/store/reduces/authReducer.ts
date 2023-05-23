import { AUTH_LOGOUT, AUTH_SUCCESS } from '../actions/types'
import { ActionInterface } from './interfaces'

const initialState = {
  token: null,
}

export default function authReducer(
  state = initialState,
  action: ActionInterface
) {
  switch (action.type) {
    case AUTH_SUCCESS:
      return {
        ...state,
        token: action.payload,
      }
    case AUTH_LOGOUT:
      return {
        ...state,
        token: null,
      }
    default:
      return state
  }
}
