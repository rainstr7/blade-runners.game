
import { PLAYER_SCORE } from './types'

export const changeScore = (score: number) => {
  return {
    type: PLAYER_SCORE,
    score
  }
}
