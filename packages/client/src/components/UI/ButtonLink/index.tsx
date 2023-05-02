import cn from './style.module.scss'
import { FC, PropsWithChildren, ReactNode } from 'react'

interface ButtonLinkProps {
  children: ReactNode
  href?: string
}

const ButtonLink: FC<PropsWithChildren<ButtonLinkProps>> = ({
  children,
  href = '#',
  ...props
}) => {
  return (
    <a className={cn.ButtonLink} href={href} {...props}>
      {children}
    </a>
  )
}

export default ButtonLink
