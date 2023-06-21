import { PLAYER_SCORE, PLAYER_LEADERBOARD } from '../actions/types'
import { ActionInterface } from './interfaces'

const initialState = {
  value: 0,
  leaderboard: [],
}

export default function scoreReducer(
  state = initialState,
  action: ActionInterface
) {
  switch (action.type) {
    case PLAYER_SCORE:
      return {
        ...state,
        value: action.payload,
      }
    case PLAYER_LEADERBOARD:
      return {
        ...state,
        leaderboard: action.payload,
      }
    default:
      return state
  }
}
