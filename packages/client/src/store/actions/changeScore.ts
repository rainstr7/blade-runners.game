import { PLAYER_SCORE } from './types'

export const changeScore = (payload: number) => {
  return {
    type: PLAYER_SCORE,
    payload,
  }
}
