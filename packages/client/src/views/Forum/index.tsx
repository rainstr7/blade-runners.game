import cn from './style.module.scss'
import React, { ReactNode } from 'react'
interface ForumProps {
  children: ReactNode
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
  id?: string
}
const Forum = ({ children, onClick, id }: ForumProps) => {
  return (
    <div className={cn.ForumContainer} onClick={onClick} id={id}>
      {children}
    </div>
  )
}

export default Forum
