import {
  ActionInterface,
  EmojiPayloadInterface,
  ForumIDPayloadType,
  ForumsPayloadInterface,
  ForumType,
  MessagePayloadInterface,
} from './interfaces'
import {
  ADD_EMOJI,
  ADD_MESSAGE,
  DEL_EMOJI,
  DEL_MESSAGE,
  FORUMS_DOWNLOAD,
  MESSAGES_DOWNLOAD,
  ADD_FORUM,
} from '../actions/types'

const initialState: {
  forums: ForumType
  messages: MessagePayloadInterface[]
} = {
  forums: [],
  messages: [],
}

export default function forumReducer(
  state = initialState,
  action: ActionInterface & {
    payload: ForumsPayloadInterface | EmojiPayloadInterface | ForumIDPayloadType
  }
) {
  switch (action.type) {
    case FORUMS_DOWNLOAD:
      return {
        ...state,
        forums: action.payload,
      }
    case ADD_FORUM:
      return {
        ...state,
        forums: [...state.forums, action.payload],
      }
    case MESSAGES_DOWNLOAD:
      return {
        ...state,
        messages: action.payload,
      }
    case ADD_EMOJI:
      return {
        ...state,
        messages: state.messages.map(message => {
          if (
            message.id === (action.payload as EmojiPayloadInterface).messageID
          ) {
            message.emoji = [
              ...message.emoji,
              (action.payload as EmojiPayloadInterface).emoji,
            ]
          }
          return message
        }),
      }
    case DEL_EMOJI:
      return {
        ...state,
        messages: state.messages.map(message => {
          if (
            message.id === (action.payload as EmojiPayloadInterface).messageID
          ) {
            return {
              ...message,
              emoji: message.emoji.filter(
                emoji =>
                  emoji.emoji !==
                  (action.payload as EmojiPayloadInterface).emoji.emoji
              ),
            }
          }
          return message
        }),
      }
    case ADD_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, action.payload],
      }
    case DEL_MESSAGE:
      return {
        ...state,
      }
    default:
      return state
  }
}
