import {
  ActionInterface,
  EmojiPayloadInterface,
  ForumIDPayloadType,
  ForumsPayloadInterface,
  ForumType,
  MessageIDPayloadType,
  MessagesPayloadInterface,
  TopicIDPayloadType,
  TopicsPayloadInterface,
} from './interfaces'
import {
  ADD_EMOJI,
  ADD_FORUM,
  ADD_MESSAGE,
  ADD_TOPIC,
  DEL_EMOJI,
  DEL_MESSAGE,
  DEL_TOPIC,
  FORUMS_DOWNLOAD,
  MESSAGES_DOWNLOAD,
} from '../actions/types'
import { EmojiClickData } from 'emoji-picker-react'

export const messagesDB: {[id: string]: MessagesPayloadInterface} = {
  '1': {
    1: {
      author: 'el nina',
      avatar: undefined,
      content: 'Сообщение 1',
      date: new Date(),
      emoji: [],
    },
    2: {
      author: 'el kampot',
      avatar: undefined,
      content: 'Сообщение 2',
      date: new Date(),
      emoji: [],
    },
    3: {
      author: 'el bobo',
      avatar: undefined,
      content: 'Сообщение 3',
      date: new Date(),
      emoji: [],
    },

    4: {
      author: 'el lol',
      avatar: undefined,
      content: 'Сообщение 4',
      date: new Date(),
      emoji: [],
    },
  },
  '2': {
    1: {
      author: 'el nina',
      avatar: undefined,
      content: 'Сообщение 5',
      date: new Date(),
      emoji: [],
    },
    2: {
      author: 'el kampot',
      avatar: undefined,
      content: 'Сообщение 6',
      date: new Date(),
      emoji: [],
    },
    3: {
      author: 'el bobo',
      avatar: undefined,
      content: 'Сообщение 7',
      date: new Date(),
      emoji: [],
    },

    4: {
      author: 'el lol',
      avatar: undefined,
      content: 'Сообщение 8',
      date: new Date(),
      emoji: [],
    },
  },
}

const topics = {
  '1': {
    title: 'Topic 1',
    messagesCount: 132,
  },
  '2': {
    title: 'Topic 2',
    messagesCount: 121,
  },
}

export const forumsDB: ForumsPayloadInterface['forums'] = {
  '1': {
    title: 'Forum 1',
    topics: { ...topics },
    topicsCount: 4,
    messagesCount: 112,
  },
  '2': {
    title: 'Forum 2',
    topics: { ...topics },
    topicsCount: 3,
    messagesCount: 112,
  },
  '3': {
    title: 'Forum 3',
    topics: { ...topics },
    topicsCount: 5,
    messagesCount: 112,
  },
}

const initialState: {
  forums: ForumType
  messages: MessagesPayloadInterface
} = {
  forums: {},
  messages: {},
}

export default function forumReducer(
  state = initialState,
  action: ActionInterface & {
    payload:
      | ForumsPayloadInterface
      | TopicsPayloadInterface
      | MessagesPayloadInterface
      | EmojiPayloadInterface
      | ForumIDPayloadType
      | TopicIDPayloadType
  }
) {
  switch (action.type) {
    case FORUMS_DOWNLOAD:
      return {
        ...state,
        forums: action.payload,
      }
    case MESSAGES_DOWNLOAD:
      return {
        ...state,
        messages: action.payload,
      }
    case ADD_EMOJI:
      return {
        ...state,
        messages: {
          ...state.messages,
          [(action.payload as EmojiPayloadInterface).messageID]: {
            ...state.messages[
              (action.payload as EmojiPayloadInterface).messageID
            ],
            emoji: [
              ...state.messages[
                (action.payload as EmojiPayloadInterface).messageID
              ].emoji,
              (action.payload as EmojiPayloadInterface).emoji,
            ],
          },
        },
      }
    case DEL_EMOJI:
      return {
        ...state,
        messages: {
          ...state.messages,
          [(action.payload as EmojiPayloadInterface).messageID]: {
            ...state.messages[
              (action.payload as EmojiPayloadInterface).messageID
            ],
            emoji: state.messages[
              (action.payload as EmojiPayloadInterface).messageID
            ].emoji.filter(
              (em: EmojiClickData) =>
                em.unified !==
                (action.payload as EmojiPayloadInterface).emoji.unified
            ),
          },
        },
      }
    case ADD_MESSAGE:
      return {
        ...state,
        messages: {
          ...state.messages,
          [(action.payload as MessageIDPayloadType).messageID]: {
            content: (action.payload as MessagesPayloadInterface).content,
            author: (action.payload as MessagesPayloadInterface).author,
            avatar: (action.payload as MessagesPayloadInterface).avatar,
            date: (action.payload as MessagesPayloadInterface).date,
            emoji: (action.payload as MessagesPayloadInterface).emoji,
          },
        },
      }
    case DEL_MESSAGE:
      delete state.messages[(action.payload as MessageIDPayloadType).messageID]
      return {
        ...state,
      }
    case ADD_FORUM:
      return {
        ...state,
        ...action.payload,
      }
    case ADD_TOPIC:
      return {
        messages: {
          ...state.messages,
        },
        forums: {
          ...state.forums,
          [(action.payload as ForumIDPayloadType).forumID]: {
            ...state.forums[(action.payload as ForumIDPayloadType).forumID],
            topics: {
              ...state.forums[(action.payload as ForumIDPayloadType).forumID]
                .topics,
              [5]: {
                title: (action.payload as TopicsPayloadInterface).title,
                messagesCount: (action.payload as TopicsPayloadInterface)
                  .messagesCount,
              },
            },
          },
        },
      }
    case DEL_TOPIC:
      delete state.forums[(action.payload as ForumIDPayloadType).forumID]
        .topics[(action.payload as TopicIDPayloadType).topicID]
      return {
        ...state,
      }
    default:
      return state
  }
}
