import cn from './style.module.scss'
import { ButtonHTMLAttributes, FC } from 'react'

const Header: FC<ButtonHTMLAttributes<HTMLHeadElement>> = ({ children }) => {
  return <h1 className={cn.Header}>{children}</h1>
}

export default Header
