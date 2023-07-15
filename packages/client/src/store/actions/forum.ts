import {
  ADD_EMOJI,
  ADD_FORUM,
  ADD_MESSAGE,
  DEL_EMOJI,
  DEL_MESSAGE,
  FORUMS_DOWNLOAD,
  MESSAGES_DOWNLOAD
} from './types'
import {
  EmojiPayloadInterface, ForumPayloadInterface,
  ForumType,
  MessageIDPayloadType,
  MessagePayloadInterface
} from '../reduces/interfaces'

export const forumsDownload = (payload: ForumType) => {
  return {
    type: FORUMS_DOWNLOAD,
    payload,
  }
}

export const messagesDownload = (payload: any) => {
  return {
    type: MESSAGES_DOWNLOAD,
    payload,
  }
}

export const addForum = (payload: ForumPayloadInterface) => {
  return {
    type: ADD_FORUM,
    payload,
  }
}

export const addEmoji = (payload: EmojiPayloadInterface) => {
  return {
    type: ADD_EMOJI,
    payload,
  }
}

export const delEmoji = (payload: EmojiPayloadInterface) => {
  return {
    type: DEL_EMOJI,
    payload,
  }
}

export const addMessage = (payload: MessagePayloadInterface) => {
  return {
    type: ADD_MESSAGE,
    payload,
  }
}

export const delMessage = (payload: MessageIDPayloadType) => {
  return {
    type: DEL_MESSAGE,
    payload,
  }
}
