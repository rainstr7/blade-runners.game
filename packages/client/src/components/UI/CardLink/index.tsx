import cn from './style.module.scss'
import { FC, PropsWithChildren, ReactNode } from 'react'
import { NavLink } from 'react-router-dom'

interface CardLinkProps {
  children: ReactNode
  to?: string,
}

const CardLink: FC<PropsWithChildren<CardLinkProps>> = ({
  children,
  to = '/',
  ...props
}) => {
  return (
    <NavLink className={cn.CardLink} to={to} {...props}>
      {children}
    </NavLink>
  )
}

export default CardLink
