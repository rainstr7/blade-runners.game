import {
  CLEAN_PROFILE,
  CREATE_PROFILE,
  HIDE_ALERT,
  HIDE_LOADER,
  PLAYER_SCORE,
  PLAYER_LEADERBOARD,
  SHOW_ALERT,
  SHOW_LOADER,
  UPDATE_PROFILE,
} from '../actions/types'

type responseInfo = string | undefined
export type AlertType = 'success' | 'error' | 'warning' | 'info'
export interface AlertPayloadInterface {
  show: boolean
  type: AlertType
  text?: string
}
export interface LoadingPayloadInterface {
  loading: boolean
}

export interface ScorePayloadInterface {
  value: number
}

export interface UserPayloadInterface {
  id?: number
  first_name: responseInfo
  second_name: responseInfo
  display_name: responseInfo
  login: responseInfo
  email: responseInfo
  phone: responseInfo
  avatar: responseInfo
}

export interface IRootStore {
  score: ScorePayloadInterface
  user: UserPayloadInterface
  alert: AlertPayloadInterface
  loading: LoadingPayloadInterface
}

export interface ActionInterface {
  type: keyof typeof actions
  payload?: unknown
}

const actions = {
  PLAYER_SCORE,
  PLAYER_LEADERBOARD,
  UPDATE_PROFILE,
  CREATE_PROFILE,
  CLEAN_PROFILE,
  SHOW_ALERT,
  HIDE_ALERT,
  SHOW_LOADER,
  HIDE_LOADER,
}
