
import { PLAYER_SCORE } from './types'

export const changeScore = (score: number) => {
  console.log(`change-${score}`)
  return {
    type: PLAYER_SCORE,
    score
  }
}
