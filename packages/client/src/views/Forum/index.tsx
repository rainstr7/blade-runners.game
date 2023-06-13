import cn from './style.module.scss'
import { ReactNode } from 'react'
interface ForumProps {
  children: ReactNode
}
const Forum = ({ children }: ForumProps) => {
  return <div className={cn.ForumContainer}>{children}</div>
}

export default Forum
