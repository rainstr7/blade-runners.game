import cn from './styles.module.scss'

import { ChangeEventHandler } from 'react'

interface Props {
  placeholder: string;
  type: 'text' | 'password' | 'phone';
  value: string;
  name: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

const Input = ({ placeholder, type, value, name, onChange }: Props) => {
  return (
    <input
      className={cn.Input}
      placeholder={placeholder}
      type={type}
      value={value}
      onChange={onChange}
      id={name}
      name={name}
    />
  )
}

export default Input
