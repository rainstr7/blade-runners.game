import { Routes, Route } from 'react-router-dom'
import cn from './Forum.module.scss'
import ForumList from './ForumList'
import ForumPage from './ForumPage'
import ThemePage from './ThemePage'
import CreateTheme from './CreateTheme'

export const PathList: Record<string, string> = {
  main: '/',
  start: '/start',
  signup: '/signup',
  auth: '/signin',
  game: '/game',
  forum: '/forum',
  createTheme: '/forum/newtheme',
}
const Forum: React.FC = () => {
  return (
    <div className={cn.ForumContainer}>
      <Routes>
        <Route path="/" element={<ForumList />} />
        <Route path="/newtheme" element={<CreateTheme />} />
        <Route path="/:id" element={<ForumPage />} />
        <Route path="/:id/:id" element={<ThemePage />} />
      </Routes>
    </div>
  )
}

export default Forum
