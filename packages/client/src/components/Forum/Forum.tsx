import * as React from 'react'
import { Routes, Route } from 'react-router-dom'
import styles from './Forum.module.scss'
import { ForumList } from './ForumList'
import { ForumPage } from './ForumPage'
import { ThemePage } from './ThemePage'
import { CreateTheme } from './CreateTheme'

export type Forum = {
  id: string
  title: string
  topics: Topic[]
  topicsCount: number
  messagesCount: number
}

export type Topic = {
  id: string
  title: string
  messagesCount: number
  messages: Message[]
}

export type Message = {
  id: string
  author: string
  content: string
  time: string //Todo
}

export const messages: Message[] = [
  {
    id: '1',
    author: 'el nina',
    content:
      'Сообщение 1 adowniawodnawodn donawdnoawndawo dnoawdnwoadnowadn NNAOIWNDOAIWNDIOANWDOAWNDOAWN',
    time: '23:20',
  },
  {
    id: '2',
    author: 'el kampot',
    content:
      'Сообщение 2 This is spartaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
    time: '23:30',
  },
  { id: '3', author: 'el bobo', content: 'Сообщение 3', time: '21:30' },
  { id: '4', author: 'el lol', content: 'Сообщение 4', time: '13:30' },
]

export const topics: Topic[] = [
  {
    id: '1',
    title: 'topic first 1111',
    messagesCount: 132,
    messages: messages,
  },
  {
    id: '2',
    title: 'topic second 2222',
    messagesCount: 121,
    messages: messages,
  },
]
export const forums: Forum[] = [
  {
    id: '1',
    title: 'Forum 1',
    topics: topics,
    topicsCount: 4,
    messagesCount: 112,
  },
  {
    id: '2',
    title: 'Forum 2',
    topics: topics,
    topicsCount: 3,
    messagesCount: 112,
  },
  {
    id: '3',
    title: 'Forum 3',
    topics: topics,
    topicsCount: 5,
    messagesCount: 112,
  },
]
export const Forum: React.FC = () => {
  return (
    <div className={styles.ForumContainer}>
      <Routes>
        <Route path="/" element={<ForumList />} />
        <Route path="/newtheme" element={<CreateTheme />} />
        <Route path="/:id" element={<ForumPage />} />
        <Route path="/:id/:id" element={<ThemePage />} />
      </Routes>
    </div>
  )
}
