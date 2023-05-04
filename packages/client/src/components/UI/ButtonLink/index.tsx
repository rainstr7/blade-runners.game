import cn from './style.module.scss'
import { FC, PropsWithChildren, ReactNode } from 'react'
import { NavLink } from 'react-router-dom'

interface ButtonLinkProps {
  children: ReactNode
  to?: string
}

const ButtonLink: FC<PropsWithChildren<ButtonLinkProps>> = ({
  children,
  to = '/',
  ...props
}) => {
  return (
    <NavLink className={cn.ButtonLink} to={to} {...props}>
      {children}
    </NavLink>
  )
}

export default ButtonLink
