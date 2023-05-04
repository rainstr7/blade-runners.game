import cn from './style.module.scss'
import { FC, PropsWithChildren, ReactNode } from 'react'
import { NavLink } from 'react-router-dom'

interface ButtonLinkProps {
  children: ReactNode
  to?: string,
  card?: boolean
}

const ButtonLink: FC<PropsWithChildren<ButtonLinkProps>> = ({
  children,
  to = '/',
  card = false,
  ...props
}) => {
  const cardStyle = card ? cn['ButtonLinkCard'] : ''
  return (
    <NavLink className={`${cn.ButtonLink} ${cardStyle}`} to={to} {...props}>
      {children}
    </NavLink>
  )
}

export default ButtonLink
