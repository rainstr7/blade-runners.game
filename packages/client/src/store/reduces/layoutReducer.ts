import { CHANGE_LAYOUT_VIEW } from '../actions/types'
import { ActionInterface } from './interfaces'

const initialState = {
  type: 'Default',
}

export default function layoutReducer(
  state = initialState,
  action: ActionInterface
) {
  switch (action.type) {
    case CHANGE_LAYOUT_VIEW:
      return {
        ...state,
        type: action.payload,
      }
    default:
      return state
  }
}
