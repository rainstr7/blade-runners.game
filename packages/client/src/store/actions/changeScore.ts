import { PLAYER_SCORE, PLAYER_LEADERBOARD } from './types'

export interface Player {
  player: object,
  rating: number
}

export const changeScore = (payload: number) => {
  return {
    type: PLAYER_SCORE,
    payload,
  }
}

export const changeLeaderboardData = (payload: Array<Player>) => {
  return {
    type: PLAYER_LEADERBOARD,
    payload
  }
}
