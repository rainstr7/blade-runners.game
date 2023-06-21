import { Player } from '../../views/Leaderboard'
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
  ADD_FORUM,
  ADD_TOPIC,
  ADD_MESSAGE,
  FORUMS_DOWNLOAD,
  MESSAGES_DOWNLOAD,
  ADD_EMOJI,
  DEL_EMOJI,
  DEL_MESSAGE,
  DEL_TOPIC,
} from '../actions/types'
import { EmojiClickData } from 'emoji-picker-react'

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
  leaderboard: Array<Player>
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

export interface ForumPayloadInterface {
  title: string
  topics: TopicsPayloadInterface
  topicsCount: number
  messagesCount: number
}

export interface EmojiPayloadInterface {
  emoji: EmojiClickData
  messageID: number | string
}

export type ForumType = { [id: string | number]: ForumPayloadInterface }
export type MessageIDPayloadType = { messageID: number }
export type ForumIDPayloadType = { forumID: number }
export type TopicIDPayloadType = { topicID: number }
export interface ForumsPayloadInterface {
  forums: ForumType
  messages: MessagesPayloadInterface
}

export interface TopicPayloadInterface {
  title: string
  messagesCount: number
}
export interface TopicsPayloadInterface {
  [id: string | number]: TopicPayloadInterface
}
export interface MessagePayloadInterface {
  author: string
  avatar?: string
  content: string
  date: Date
  emoji: EmojiClickData[]
}
export interface MessagesPayloadInterface {
  [id: string | number]: MessagePayloadInterface
}

export interface IRootStore {
  score: ScorePayloadInterface
  user: UserPayloadInterface
  alert: AlertPayloadInterface
  loading: LoadingPayloadInterface
  forum: ForumsPayloadInterface
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
  FORUMS_DOWNLOAD,
  MESSAGES_DOWNLOAD,
  ADD_EMOJI,
  DEL_EMOJI,
  ADD_FORUM,
  ADD_TOPIC,
  DEL_TOPIC,
  ADD_MESSAGE,
  DEL_MESSAGE,
}
