import { Routes, Route } from 'react-router-dom'
import cn from './style.module.scss'
import ForumList from '../../components/Forum/ForumList'
import ForumPage from '../../components/Forum/ForumPage'
import ThemePage from '../../components/Forum/ThemePage'
import CreateTheme from '../../components/Forum/CreateTheme'

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
