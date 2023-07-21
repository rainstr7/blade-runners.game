import {
  ADD_EMOJI,
  ADD_MESSAGE,
  ADD_TOPIC,
  DEL_EMOJI,
  DEL_MESSAGE,
  DEL_TOPIC,
  FORUMS_DOWNLOAD,
  MESSAGES_DOWNLOAD,
} from './types'
import {
  EmojiPayloadInterface,
  ForumIDPayloadType,
  ForumType,
  MessageIDPayloadType,
  MessagePayloadInterface,
  MessagesPayloadInterface,
  TopicIDPayloadType,
  TopicPayloadInterface,
} from '../reduces/interfaces'

export const forumsDownload = (payload: ForumType) => {
  return {
    type: FORUMS_DOWNLOAD,
    payload,
  }
}

export const messagesDownload = (payload: MessagesPayloadInterface) => {
  return {
    type: MESSAGES_DOWNLOAD,
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

export const addTopic = (
  payload: TopicPayloadInterface & ForumIDPayloadType
) => {
  return {
    type: ADD_TOPIC,
    payload,
  }
}

export const delTopic = (payload: ForumIDPayloadType & TopicIDPayloadType) => {
  return {
    type: DEL_TOPIC,
    payload,
  }
}
