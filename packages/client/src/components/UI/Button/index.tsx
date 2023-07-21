import cn from './style.module.scss'
import { ButtonHTMLAttributes, FC } from 'react'

interface Props {
  size?: 'small' | 'medium' | 'large'
}

const Button: FC<ButtonHTMLAttributes<HTMLButtonElement> & Props> = ({
  children,
  size = 'medium',
  ...props
}) => {
  const buttonSize = cn[size]
  return (
    <button className={`${cn.Button} ${buttonSize}`} {...props}>
      {children}
    </button>
  )
}

export default Button
