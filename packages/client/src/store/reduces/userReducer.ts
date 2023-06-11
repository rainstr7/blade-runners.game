import { CLEAN_PROFILE, CREATE_PROFILE, UPDATE_PROFILE } from '../actions/types'
import { ActionInterface, UserPayloadInterface } from './interfaces'

const initialState: UserPayloadInterface = {
  id: undefined,
  first_name: undefined,
  second_name: undefined,
  display_name: undefined,
  login: undefined,
  email: undefined,
  phone: undefined,
  avatar: undefined,
}

export default function userReducer(
  state = initialState,
  action: ActionInterface & { payload: UserPayloadInterface }
) {
  switch (action.type) {
    case UPDATE_PROFILE:
    case CREATE_PROFILE:
      return {
        ...state,
        ...action.payload,
      }
    case CLEAN_PROFILE:
      return {
        ...initialState,
      }
    default:
      return state
  }
}
