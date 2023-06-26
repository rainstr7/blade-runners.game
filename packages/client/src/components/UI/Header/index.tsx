import cn from './style.module.scss'
import { ButtonHTMLAttributes, FC, useContext } from 'react'
import { ThemeContext } from '../../Theme'

const Header: FC<ButtonHTMLAttributes<HTMLHeadElement>> = ({ children }) => {
  const theme = useContext(ThemeContext)

  return <h1 className={cn.Header} style={{color: `${theme?.defaultColor}` }}>{children}</h1>
}

export default Header
