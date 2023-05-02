import cn from './style.module.scss'
import { ButtonHTMLAttributes, FC } from 'react'

const Button: FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({
  children,
  ...props
}) => {
  return (
    <button className={cn.Button} {...props}>
      {children}
    </button>
  )
}

export default Button
