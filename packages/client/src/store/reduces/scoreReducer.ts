import { PLAYER_SCORE } from '../actions/types'
import { ActionInterface } from './interfaces'

const initialState = {
  value: 0
}

export default function scoreReducer(state = initialState, action: ActionInterface) {
  switch (action.type) {
    case PLAYER_SCORE:
      return {
        ...state,
        value: action.payload
      }
    default:
      return state
  }
}
