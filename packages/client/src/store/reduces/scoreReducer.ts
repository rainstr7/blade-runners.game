import { PLAYER_SCORE } from '../actions/types'

const initialState = {
  value: 0
}

export default function scoreReducer(state = initialState, action: any) {
  switch (action.type) {
    case PLAYER_SCORE:
      return {
        ...state,
        value: action.score
      }
    default:
      return state
  }
}
