import {
  AUTH_LOGOUT,
  AUTH_SUCCESS,
  CHANGE_LAYOUT_VIEW,
  PLAYER_SCORE,
} from '../actions/types'
import { ErrorType } from '../../views/Errors/errors'

export type LayoutView = 'Default' | 'GameOver' | 'Landing' | ErrorType

export interface IRootStore {
  layout: {
    type: LayoutView
  }
  score: {
    value: number
  }
  auth: {
    token: string
  }
}

export interface ActionInterface {
  type: keyof typeof actions
  payload?: unknown
}

const actions = {
  CHANGE_LAYOUT_VIEW,
  AUTH_SUCCESS,
  AUTH_LOGOUT,
  PLAYER_SCORE,
}
