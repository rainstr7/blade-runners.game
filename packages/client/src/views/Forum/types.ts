export type ForumType = {
  id: number
  title: string
  topics: Topic[]
  topicsCount: number
  messagesCount: number
}

export type Topic = {
  id: number
  title: string
  messagesCount: number
  messages: Message[]
}

export type Message = {
  id: number
  author: string
  content: string
  time: string
}
